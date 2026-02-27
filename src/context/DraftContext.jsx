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

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Init from local storage or sys pref
        return localStorage.getItem('snapwrite_theme') === 'dark';
    });

    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

    // Toggle Theme
    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('snapwrite_theme', newValue ? 'dark' : 'light');
            if (newValue) {
                document.body.classList.add('dark');
                setIsConfigModalOpen(true); // Open modal when switching to dark/custom mode
            } else {
                document.body.classList.remove('dark');
                setIsConfigModalOpen(false); // Close if switching back
            }
            return newValue;
        });
    }, []);

    // Sync body class on mount
    useState(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []);

    const [customConfig, setCustomConfig] = useState(() => {
        const savedConfig = localStorage.getItem('snapwrite_custom_config');
        if (savedConfig) {
            try {
                return JSON.parse(savedConfig);
            } catch (e) {
                console.error('Failed to parse saved config', e);
            }
        }
        return {
            apiUrl: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-3.5-turbo',
            apiKey: ''
        };
    });

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

            // Determining Config: Dark Mode = Custom
            let requestConfig = null;
            if (isDarkMode) {
                // Use in-memory config directly
                requestConfig = customConfig;
            }

            for await (const chunk of optimizeContentStream(originalText, requestConfig)) {
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
    }, [originalText, versions.length, isDarkMode, customConfig]);

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
        setLayoutMode,
        isDarkMode,
        toggleTheme,
        customConfig,
        setCustomConfig,
        isConfigModalOpen,
        setIsConfigModalOpen
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
