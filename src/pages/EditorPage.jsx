import EditorSplitView from '../components/editor/EditorSplitView';
import PullCord from '../components/common/PullCord';
import ConfigModal from '../components/settings/ConfigModal';

export default function EditorPage() {
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
                <a href="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>Back to Home</a>
            </header>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <EditorSplitView />
            </div>
        </div>
    );
}
