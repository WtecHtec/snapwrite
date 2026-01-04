export default function PhoneModel({ children }) {
    // Logic width: 375px (iPhone standard logic width)
    // We can scale it if needed, but for now we keep it true size or fitted

    return (
        <div style={{
            width: '375px',
            height: '667px', /* iPhone 8 Logic Height or similar */
            background: 'white',
            border: '12px solid #1e293b', /* Phone Frame Color */
            borderRadius: '40px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Notch / Status Bar Area */}
            <div style={{
                height: '24px',
                background: '#1e293b',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '10px'
            }}>
                <div style={{ width: '60px', height: '6px', background: '#334155', borderRadius: '3px' }}></div>
            </div>

            {/* Screen Content */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                background: '#ffffff',
                position: 'relative'
            }}>
                {children}
            </div>

            {/* Home Area indicator */}
            <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '4px',
                background: '#e2e8f0',
                borderRadius: '2px',
                opacity: 0.5,
                pointerEvents: 'none'
            }}></div>
        </div>
    );
}
