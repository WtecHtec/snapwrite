export default function BlockingOverlay({ isVisible }) {
    if (!isVisible) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 50,
            background: 'rgba(255, 255, 255, 0.1)', // Almost transparent
            cursor: 'wait',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(1px)' // Subtle blur
        }}>
            <div style={{
                background: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
                <div className="spinner-sm"></div>
                <span>Generating Content...</span>
            </div>

            <style>{`
        .spinner-sm {
          width: 16px; 
          height: 16px; 
          border: 2px solid rgba(255,255,255,0.3); 
          border-top-color: white; 
          border-radius: 50%; 
          animation: spin 1s linear infinite;
        }
      `}</style>
        </div>
    );
}
