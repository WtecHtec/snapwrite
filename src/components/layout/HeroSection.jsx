export default function HeroSection({ onStart }) {
    return (
        <section style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
            <h1>One-click Article Optimization</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
                Transform your text into a perfectly active mobile layout in seconds.
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
                Start Optimizing
            </button>
        </section>
    );
}
