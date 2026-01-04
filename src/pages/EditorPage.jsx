import EditorSplitView from '../components/editor/EditorSplitView';

export default function EditorPage() {
    return (
        <div className="editor-page" style={{
            minHeight: '100vh',
            padding: 'var(--spacing-md)',
            background: 'var(--bg-app)'
        }}>
            <header style={{
                marginBottom: 'var(--spacing-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 var(--spacing-sm)'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>QuickDraft AI</h2>
                <a href="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>Back to Home</a>
            </header>
            <EditorSplitView />
        </div>
    );
}
