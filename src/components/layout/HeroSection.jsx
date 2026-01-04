export default function HeroSection({ onStart }) {
    return (
        <section style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
            <h1>写作更轻松，排版更专业</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
                AI 驱动的写作助手，让您的文字脱颖而出。
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
