import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/layout/HeroSection';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/app');
    };

    return (
        <div className="landing-page" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)'
        }}>
            <HeroSection onStart={handleStart} />

            <div style={{ marginTop: '60px', maxWidth: '800px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <h3>Why choose QuickDraft AI?</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>Instant Layout</h4>
                        <p style={{ fontSize: '0.9rem' }}>Turn raw text into beautiful HTML in seconds.</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>Mobile First</h4>
                        <p style={{ fontSize: '0.9rem' }}>Preview exactly how it looks on a phone screen.</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>Version Control</h4>
                        <p style={{ fontSize: '0.9rem' }}>Iterate safely with auto-saved versions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
