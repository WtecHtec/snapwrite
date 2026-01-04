import { useDraft } from '../../context/DraftContext';

export default function VersionTabs() {
    const { versions, activeVersionId, setActiveVersionId } = useDraft();

    if (versions.length === 0) return null;

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            padding: '0 var(--spacing-md)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-panel)',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}>
            {versions.map((version) => (
                <button
                    key={version.id}
                    onClick={() => setActiveVersionId(version.id)}
                    style={{
                        background: activeVersionId === version.id ? 'var(--bg-app)' : 'transparent',
                        color: activeVersionId === version.id ? 'var(--primary)' : 'var(--text-secondary)',
                        border: 'none',
                        borderBottom: activeVersionId === version.id ? '2px solid var(--primary)' : '2px solid transparent',
                        borderRadius: 0,
                        padding: '12px 16px',
                        fontSize: '0.9rem',
                        fontWeight: 500
                    }}
                >
                    {version.name}
                </button>
            ))}
        </div>
    );
}
