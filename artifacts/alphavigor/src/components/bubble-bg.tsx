// Static seed so bubbles are deterministic (no Math.random on each render)
const BUBBLES = [
  { size: 18, left:  4, delay: 0,   dur: 8,  opacity: 0.05 },
  { size: 32, left: 12, delay: 1.8, dur: 11, opacity: 0.06 },
  { size: 14, left: 22, delay: 3.2, dur: 7,  opacity: 0.04 },
  { size: 46, left: 35, delay: 0.6, dur: 13, opacity: 0.05 },
  { size: 24, left: 50, delay: 2.4, dur: 9,  opacity: 0.07 },
  { size: 38, left: 63, delay: 4.1, dur: 10, opacity: 0.04 },
  { size: 16, left: 74, delay: 1.2, dur: 8,  opacity: 0.06 },
  { size: 42, left: 83, delay: 3.7, dur: 12, opacity: 0.05 },
  { size: 20, left: 91, delay: 0.3, dur: 9,  opacity: 0.04 },
  { size: 29, left: 57, delay: 2.9, dur: 11, opacity: 0.06 },
  { size: 12, left: 44, delay: 5.5, dur: 7,  opacity: 0.05 },
  { size: 35, left: 17, delay: 4.8, dur: 10, opacity: 0.04 },
];

interface BubbleBgProps {
  color?: string;
  className?: string;
}

export function BubbleBg({ color = '#0f1f3d', className = '' }: BubbleBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 bubble-float"
          style={{
            width:  b.size,
            height: b.size,
            left:   `${b.left}%`,
            bottom: '-60px',
            borderColor: color,
            opacity: b.opacity,
            animationDelay:    `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
