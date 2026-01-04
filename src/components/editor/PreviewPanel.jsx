import { toast } from 'sonner';
import { Copy, Edit2, FileText, Smartphone } from 'lucide-react';
import { useDraft } from '../../context/DraftContext';
import VersionTabs from '../preview/VersionTabs';
import PhoneModel from '../preview/PhoneModel';

export default function PreviewPanel() {
  const { currentVersion, isGenerating, updateVersion, setLayoutMode } = useDraft();

  // Copy rich text (HTML) function
  const handleCopy = () => {
    const preview = document.getElementById('preview-content');
    if (!preview) return;

    try {
      const range = document.createRange();
      range.selectNodeContents(preview);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Rich Text copied! Ready to paste into WeChat/Word.');
      } else {
        toast.error('Copy failed. Please try again.');
      }

      selection.removeAllRanges(); // Deselect
    } catch (err) {
      console.error('Copy error:', err);
      toast.error('Failed to copy content.');
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      <VersionTabs />

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--spacing-xl)',
        position: 'relative'
      }}>
        {isGenerating ? (
          <div style={{ color: 'var(--text-secondary)', animation: 'pulse 1.5s infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={32} />
            {/* Content is actually streaming in currentVersion, so we can show it! 
                  The BlockingOverlay prevents interaction, but we should render the phone with whatever content we have.
                  If content is empty, show "Generating...".
              */}
            {!currentVersion?.content ? 'Initializing Stream...' : null}
          </div>
        ) : null}

        {currentVersion ? (
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: '-50px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <button
                onClick={() => setLayoutMode('editing')}
                title="Edit Content"
                style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleCopy}
                title="Copy HTML"
                style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Copy size={18} />
              </button>
            </div>

            <PhoneModel>
              <div
                id="preview-content"
                style={{ padding: '20px', lineHeight: '1.6' }}
                dangerouslySetInnerHTML={{ __html: currentVersion.content }}
              />
            </PhoneModel>
          </div>
        ) : !isGenerating && (
          <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            <p>No version generated yet.</p>
            <p style={{ fontSize: '0.8em', marginTop: '8px' }}>Enter text on the right to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}
