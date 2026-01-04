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
                <h3>为什么选择 SnapWrite?</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>AI 自动排版</h4>
                        <p style={{ fontSize: '0.9rem' }}>智能识别内容，秒级生成微信公众号精美排版。</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>移动优先</h4>
                        <p style={{ fontSize: '0.9rem' }}>完美预览手机端显示效果。</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                        <h4>版本控制</h4>
                        <p style={{ fontSize: '0.9rem' }}>自动保存，轻松管理多个版本。</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
