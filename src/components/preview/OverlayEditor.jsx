import { useState } from 'react';

export default function OverlayEditor({ initialContent, onSave, onCancel }) {
    const [content, setContent] = useState(initialContent);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>Edit HTML</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={onCancel}
                        style={{ padding: '4px 8px', fontSize: '12px', background: 'var(--text-secondary)' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(content)}
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                        Save
                    </button>
                </div>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    flex: 1,
                    width: '100%',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    resize: 'none'
                }}
            />
        </div>
    );
}
