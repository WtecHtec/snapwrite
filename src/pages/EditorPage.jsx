import { Github, Settings, Layout } from 'lucide-react';
import EditorSplitView from '../components/editor/EditorSplitView';
import PullCord from '../components/common/PullCord';
import ConfigModal from '../components/settings/ConfigModal';
import { useDraft } from '../context/DraftContext';

export default function EditorPage() {
    const { isDarkMode, setIsConfigModalOpen, conversionStyle, setConversionStyle } = useDraft();
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-app)',
            transition: 'background-color 0.3s'
        }}>
            <PullCord />
            <ConfigModal />

            <header style={{
                flex: '0 0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-md) var(--spacing-xl)',
                borderBottom: '1px solid var(--border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>SnapWrite</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {isDarkMode && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'var(--bg-app)',
                            borderRadius: '20px',
                            padding: '2px',
                            border: '1px solid var(--border)',
                            marginRight: '8px'
                        }}>
                            <button
                                onClick={() => setConversionStyle('normal')}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '16px',
                                    fontSize: '0.8rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: conversionStyle === 'normal' ? 'var(--primary)' : 'transparent',
                                    color: conversionStyle === 'normal' ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                默认
                            </button>
                            <button
                                onClick={() => setConversionStyle('magazine')}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '16px',
                                    fontSize: '0.8rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: conversionStyle === 'magazine' ? 'var(--primary)' : 'transparent',
                                    color: conversionStyle === 'magazine' ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                杂志风
                            </button>
                            <button
                                onClick={() => setConversionStyle('custom')}
                                style={{
                                    padding: '4px 12px',
                                    borderRadius: '16px',
                                    fontSize: '0.8rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: conversionStyle === 'custom' ? 'var(--primary)' : 'transparent',
                                    color: conversionStyle === 'custom' ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                自定义
                            </button>
                        </div>
                    )}
                    {isDarkMode && (
                        <button
                            onClick={() => setIsConfigModalOpen(true)}
                            title={conversionStyle === 'custom' ? "Edit Custom Style & Config" : "Configure Custom LLM"}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: conversionStyle === 'custom' ? 'var(--primary)' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                padding: '4px'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                            onMouseOut={(e) => e.currentTarget.style.color = conversionStyle === 'custom' ? 'var(--primary)' : 'var(--text-secondary)'}
                        >
                            <Settings size={20} />
                        </button>
                    )}
                    <a
                        href="https://github.com/WtecHtec/snapwrite"
                        target="_blank"
                        rel="noreferrer"
                        title="View on GitHub"
                        style={{
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                        <Github size={20} />
                    </a>
                    <a href="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>Back to Home</a>
                </div>
            </header>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <EditorSplitView />
            </div>
        </div>
    );
}
