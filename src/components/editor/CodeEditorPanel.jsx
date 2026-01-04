import { useState, useEffect } from 'react';
import { useDraft } from '../../context/DraftContext';
import { X } from 'lucide-react';

export default function CodeEditorPanel() {
    const { currentVersion, updateVersion, setLayoutMode } = useDraft();
    const [content, setContent] = useState('');

    // Sync with current version when it changes (or on mount)
    useEffect(() => {
        if (currentVersion) {
            setContent(currentVersion.content);
        }
    }, [currentVersion?.id]); // Only reset if ID changes, to avoid cursor jumps if we synced on every keypress (though we won't sync back upstream immediately here)

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        // Real-time update or debounced could go here. 
        // For now, let's update immediately to see changes in Preview on the right.
        if (currentVersion) {
            updateVersion(currentVersion.id, newContent);
        }
    };

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#1e293b',
            borderRight: '1px solid var(--border)',
            color: '#e2e8f0'
        }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #334155', background: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>HTML Editor</h4>
                <button
                    onClick={() => setLayoutMode('default')}
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex' }}
                    title="Close Editor"
                >
                    <X size={16} />
                </button>
            </div>
            <textarea
                value={content}
                onChange={handleChange}
                style={{
                    flex: 1,
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    padding: '16px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    resize: 'none',
                    outline: 'none'
                }}
                spellCheck="false"
            />
        </div>
    );
}
