import { useDraft } from '../../context/DraftContext';
import PreviewPanel from './PreviewPanel';
import InputPanel from './InputPanel';
import CodeEditorPanel from './CodeEditorPanel';
import BlockingOverlay from '../common/BlockingOverlay';

export default function EditorSplitView() {
    const { isGenerating, layoutMode } = useDraft();

    return (
        <div style={{
            display: 'flex',
            height: '800px',
            maxWidth: '100%',
            marginTop: 'var(--spacing-md)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            background: 'var(--bg-panel)',
            transition: 'all 0.3s ease' // Smooth transition for layout changes
        }}>
            <BlockingOverlay isVisible={isGenerating} />

            {layoutMode === 'editing' ? (
                <>
                    {/* Edit Mode: [CodeEditor 40%] [Preview 55%] [InputCollapsed 5%] */}
                    <div style={{ flex: '0 0 40%', borderRight: '1px solid var(--border)' }}>
                        <CodeEditorPanel />
                    </div>
                    <div style={{ flex: '0 0 55%', borderRight: '1px solid var(--border)' }}>
                        <PreviewPanel />
                    </div>
                    <div style={{ flex: '0 0 5%' }}>
                        <InputPanel collapsed={true} />
                    </div>
                </>
            ) : (
                <>
                    {/* Default Mode: [Preview 70%] [Input 30%] */}
                    <div style={{ flex: '0 0 70%', borderRight: '1px solid var(--border)' }}>
                        <PreviewPanel />
                    </div>
                    <div style={{ flex: '0 0 30%' }}>
                        <InputPanel collapsed={false} />
                    </div>
                </>
            )}
        </div>
    );
}
