import { createContext, useContext, useState, useCallback } from 'react';
import { optimizeContentStream } from '../api/apiService';

const DraftContext = createContext();

export function DraftProvider({ children }) {
    const [activeVersionId, setActiveVersionId] = useState(null);
    const [versions, setVersions] = useState([]); // { id, content, timestamp, name }
    const [isGenerating, setIsGenerating] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [layoutMode, setLayoutMode] = useState('default'); // 'default' | 'editing'

    const generateDraft = useCallback(async () => {
        if (!originalText.trim()) return;

        setIsGenerating(true);

        // Create a new version immediately with empty content
        const newId = Date.now().toString();
        const newVersion = {
            id: newId,
            content: '', // Start empty for streaming
            timestamp: new Date(),
            name: `Version ${versions.length + 1}`
        };

        setVersions(prev => [...prev, newVersion]);
        setActiveVersionId(newId);

        try {
            let accumulatedContent = '';

            for await (const chunk of optimizeContentStream(originalText)) {
                accumulatedContent += chunk;

                // Update the specific version with new chunk
                // We use a functional update and map to ensure we don't lose other versions
                setVersions(prev => prev.map(v =>
                    v.id === newId ? { ...v, content: accumulatedContent } : v
                ));
            }
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    }, [originalText, versions.length]);

    const updateVersion = useCallback((id, newContent) => {
        setVersions(prev => prev.map(v =>
            v.id === id ? { ...v, content: newContent, name: `${v.name} (Edited)` } : v
        ));
    }, []);

    const currentVersion = versions.find(v => v.id === activeVersionId);

    const value = {
        versions,
        activeVersionId,
        setActiveVersionId,
        currentVersion,
        isGenerating,
        originalText,
        setOriginalText,
        generateDraft,
        updateVersion,
        layoutMode,
        setLayoutMode
    };

    return (
        <DraftContext.Provider value={value}>
            {children}
        </DraftContext.Provider>
    );
}

export function useDraft() {
    const context = useContext(DraftContext);
    if (!context) {
        throw new Error('useDraft must be used within a DraftProvider');
    }
    return context;
}
