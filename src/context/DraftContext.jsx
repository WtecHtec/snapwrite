import { createContext, useContext, useState, useCallback } from 'react';
import { optimizeContentStream } from '../api/apiService';

const DraftContext = createContext();

export function DraftProvider({ children }) {
    const [activeVersionId, setActiveVersionId] = useState(null);
    const [versions, setVersions] = useState([]); // { id, content, timestamp, name }
    const [isGenerating, setIsGenerating] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [layoutMode, setLayoutMode] = useState('default'); // 'default' | 'editing'
    const [tempVersion, setTempVersion] = useState(null); // Temporary state for streaming

    const generateDraft = useCallback(async () => {
        if (!originalText.trim()) return;

        setIsGenerating(true);

        // Prepare temp version
        const newId = Date.now().toString();
        const startingVersion = {
            id: newId,
            content: '',
            timestamp: new Date(),
            name: `Version ${versions.length + 1}`
        };
        setTempVersion(startingVersion);

        try {
            let accumulatedContent = '';

            for await (const chunk of optimizeContentStream(originalText)) {
                accumulatedContent += chunk;

                // Update temp version for real-time preview
                setTempVersion(prev => ({ ...prev, content: accumulatedContent }));
            }

            // Only commit if we have content
            if (accumulatedContent.trim()) {
                const finalVersion = { ...startingVersion, content: accumulatedContent };
                setVersions(prev => [...prev, finalVersion]);
                setActiveVersionId(newId);
            }

        } catch (error) {
            console.error("Generation failed", error);
            // On error, we basically discard the temp version (it won't be added to versions)
        } finally {
            setTempVersion(null);
            setIsGenerating(false);
        }
    }, [originalText, versions.length]);

    const updateVersion = useCallback((id, newContent) => {
        setVersions(prev => prev.map(v =>
            v.id === id ? { ...v, content: newContent, name: `${v.name} (Edited)` } : v
        ));
    }, []);

    // If generating, show the temp version. Otherwise show the active selected version.
    const currentVersion = tempVersion || versions.find(v => v.id === activeVersionId);

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
