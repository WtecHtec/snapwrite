export default function HeroSection({ onStart }) {
    return (
        <section style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
            <h1>微信公众号 AI 自动排版工具</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
                专注微信图文排版，一键生成精美布局，让您的文章脱颖而出。
            </p>
            <button
                onClick={onStart}
                style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: '16px 32px',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'
                }}
            >
                立即开始
            </button>
        </section>
    );
}
