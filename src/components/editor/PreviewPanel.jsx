import parse from 'html-react-parser';
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
                disabled={isGenerating}
                title="Edit Content"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isGenerating ? 0.5 : 1,
                  cursor: isGenerating ? 'not-allowed' : 'pointer'
                }}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleCopy}
                disabled={isGenerating}
                title="Copy HTML"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  padding: 0,
                  background: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isGenerating ? 0.5 : 1,
                  cursor: isGenerating ? 'not-allowed' : 'pointer'
                }}
              >
                <Copy size={18} />
              </button>
            </div>

            <PhoneModel>
              <div
                id="preview-content"
                style={{ padding: '20px', lineHeight: '1.6' }}
              >
                {/* Use html-react-parser to stable re-render images */}
                {parse(currentVersion.content || '')}
              </div>
            </PhoneModel>

            {isGenerating && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '12px 20px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'none'
              }}>
                <Smartphone size={20} className="animate-pulse" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary)' }}>
                  {!currentVersion.content ? 'Initializing...' : 'Generating...'}
                </span>
              </div>
            )}
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
