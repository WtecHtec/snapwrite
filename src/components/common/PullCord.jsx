import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useDraft } from '../../context/DraftContext';

// Number of segments in the rope
const SEGMENTS = 8;
const DAMPING = 20;
const STIFFNESS = 400;

export default function PullCord() {
    const { isDarkMode, toggleTheme } = useDraft();
    const containerRef = useRef(null);
    const [isPulling, setIsPulling] = useState(false);

    // Handle position (The bottom of the rope)
    // Initial position: center x, some padding y
    const handleX = useMotionValue(0);
    const handleY = useMotionValue(0);

    // Spring physics for the handle return
    const springHandleX = useSpring(handleX, { stiffness: 200, damping: 20 });
    const springHandleY = useSpring(handleY, { stiffness: 200, damping: 20 });

    // Creates a chain of springs for the rope segments
    // Each segment attempts to interpolate between the fixed top (0,0) and the moving handle (x,y)
    // But with spring physics, they lag behind, creating a curve/wave.
    const ropePoints = [];
    for (let i = 1; i < SEGMENTS; i++) {
        const progress = i / SEGMENTS;
        const x = useTransform(springHandleX, (val) => val * progress);
        const y = useTransform(springHandleY, (val) => {
            // Basic length + drag extension
            const baseLength = isDarkMode ? 120 : 100;
            const ext = val + baseLength;
            return ext * progress;
        });

        // Add "lag" spring to creating wave effect
        // Stagger stiffness/mass slightly? 
        ropePoints.push({
            x: useSpring(x, { stiffness: STIFFNESS, damping: DAMPING, mass: 1 }),
            y: useSpring(y, { stiffness: STIFFNESS, damping: DAMPING, mass: 1 })
        });
    }

    // Path generator
    // We need to subscribe to these changes to render the path.
    // Framer Motion 'motion.path' 'd' prop can accept a motionvalue string?
    // No, we better use a custom component or useCurrent properly.
    // Actually, `useTransform` can combine multiple MotionValues into a string path.

    const svgPath = useTransform(
        [springHandleX, springHandleY, ...ropePoints.map(p => p.x), ...ropePoints.map(p => p.y)],
        (values) => {
            const hX = values[0];
            const hY = values[1];
            // Points start at index 2. X at even, Y at odd offset from 2.
            // But simplify: Rope starts at 0,0 (Top Center relative to container)

            let path = `M 0 0`;

            // Catmull-Rom or Quadratic bezier for smoothness?
            // Simple line segments are fast but jagged. 
            // Let's do a simple curve or polyline. With 10 segments polyline looks fine as "rope".
            // Or better: Quadratic curves through midpoints.

            // Reconstruct points array
            // Fixed start
            const points = [{ x: 0, y: 0 }];

            // Spring segments
            const numPoints = ropePoints.length;
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: values[2 + i],
                    y: values[2 + numPoints + i]
                });
            }

            // Handle (End)
            const baseLength = isDarkMode ? 120 : 100;
            points.push({ x: hX, y: hY + baseLength });

            // Draw Curve
            // Using logic: M p0 L p1 L p2 ... is simple.
            // For wave, let's just do lines first. It's a "cord".
            // High segment count (15+) makes it smooth.

            return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        }
    );

    useEffect(() => {
        // Initial "physic kick" to hint interactivity
        const timer = setTimeout(() => {
            // Simulate a visible pull and release
            handleY.set(60);
            // Slight swing
            handleX.set(-20);

            // Snap back after a brief moment
            setTimeout(() => {
                handleY.set(0);
                handleX.set(0);
            }, 300);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleDrag = (_, info) => {
        handleX.set(info.offset.x);
        handleY.set(info.offset.y);
    };

    const handleDragEnd = (_, info) => {
        setIsPulling(false);

        if (info.offset.y > 150) { // Trigger threshold
            if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
            toggleTheme();
        }

        // Snap back
        handleX.set(0);
        handleY.set(0);
    };

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: '66%', // Shifted right (approx 2/3) to clear center UI
                // No translation here, we center the SVG coordinate system
                zIndex: 9999,
                pointerEvents: 'none',
                overflow: 'visible',
                width: 0,
                height: 0
            }}
        >
            {/* The SVG Rope */}
            <svg
                style={{
                    overflow: 'visible',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <motion.path
                    d={svgPath}
                    stroke={isDarkMode ? '#f472b6' : '#94a3b8'}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* The Draggable Handle (Invisible trigger + Visible Knob) */}
            {/* Note: We need to position this div based on the spring values to stay attached to rope end! */}
            <ChainHandle
                x={springHandleX}
                y={springHandleY}
                isDarkMode={isDarkMode}
                onDragStart={() => setIsPulling(true)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
}

// Separate component to handle the "Follower" logic for the React node
function ChainHandle({ x, y, isDarkMode, onDragStart, onDrag, onDragEnd }) {
    // We map the spring X/Y (which are relative offsets) to actual transform
    const baseLength = isDarkMode ? 120 : 100;
    const yWithOffset = useTransform(y, val => val + baseLength);
    const [showGuide, setShowGuide] = useState(true);

    return (
        <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.8} // Looser for more "flinging" feel
            onDragStart={() => {
                onDragStart();
                setShowGuide(false); // Hide guide once interacted
            }}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            style={{
                x,
                y: yWithOffset,
                position: 'absolute',
                left: -12, // Center visually (24px width)
                top: 0,
                cursor: 'grab',
                pointerEvents: 'auto',
                touchAction: 'none'
            }}
            whileTap={{ cursor: 'grabbing' }}
            whileHover={{ scale: 1.1 }}
        >
            <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isDarkMode ? '#f472b6' : '#e2e8f0',
                border: '3px solid white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
            }} />

            {/* Guide Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showGuide ? 1 : 0, x: showGuide ? 35 : 20 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    whiteSpace: 'nowrap',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    pointerEvents: 'none'
                }}
            >
                下拉切换 / Pull
            </motion.div>
        </motion.div>
    );
}
