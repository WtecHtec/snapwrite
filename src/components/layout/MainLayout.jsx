import HeroSection from './HeroSection';
import EditorSplitView from '../editor/EditorSplitView';

export default function MainLayout() {
    return (
        <main style={{ padding: '0 var(--spacing-md) var(--spacing-xl)' }}>
            <HeroSection />
            <EditorSplitView />
        </main>
    );
}
