import { useDraft } from '../../context/DraftContext';
import { PenLine, Wand2 } from 'lucide-react';

export default function InputPanel({ collapsed }) {
    const { originalText, setOriginalText, generateDraft, isGenerating, setLayoutMode } = useDraft();

    if (collapsed) {
        return (
            <div
                onClick={() => setLayoutMode('default')}
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 0',
                    cursor: 'pointer',
                    background: 'var(--bg-app)',
                    borderLeft: '1px solid var(--border)',
                    transition: 'background 0.2s'
                }}
                title="Restore Input Panel"
                onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-app)'}
            >
                <span style={{ marginBottom: '8px' }}><PenLine size={24} /></span>
                <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>
                    INPUT TEXT
                </span>
            </div>
        );
    }


    // Regular Full View
    return (
        <div style={{
            padding: 'var(--spacing-lg)',
            background: 'var(--bg-panel)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid var(--border)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ margin: 0 }}>Original Content</h3>
                <button
                    onClick={generateDraft}
                    disabled={isGenerating || !originalText.trim()}
                    title="AI Optimize"
                    style={{
                        padding: '8px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: (isGenerating || !originalText.trim()) ? 0.6 : 1,
                        cursor: (isGenerating || !originalText.trim()) ? 'not-allowed' : 'pointer',
                        background: 'var(--primary)',
                        border: 'none',
                        color: 'white',
                        transition: 'transform 0.2s',
                        boxShadow: 'var(--shadow-md)'
                    }}
                    onMouseOver={(e) => !isGenerating && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isGenerating ? (
                        <div className="spinner" style={{
                            width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite'
                        }}></div>
                    ) : (
                        <Wand2 size={20} />
                    )}
                </button>
            </div>

            <textarea
                placeholder="Paste your text here to optimize..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                style={{
                    flex: 1,
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    resize: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    background: 'var(--bg-app)',
                    color: 'var(--text-main)'
                }}
            />


            <style>{`
@keyframes spin {
          to { transform: rotate(360deg); }
}
`}</style>
        </div>
    );
}
