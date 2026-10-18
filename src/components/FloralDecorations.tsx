import React, { useEffect, useRef } from 'react';

// Soft falling flower petals on a lightweight HTML5 canvas
export const FallingPetalsCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#F6C9D2', '#ECA4B2', '#FFE8A3', '#FFFFFF', '#F9DFE5'];
    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: Math.random() * 1.2 - 0.6,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw curved flower petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size, -p.size * 1.2, -p.size * 0.8, -p.size * 2, 0, -p.size * 2.2);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 2, p.size, -p.size * 1.2, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
};

// Cute Corner Flower Accents
export const FloralCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const transform =
    position === 'top-right'
      ? 'scale-x-[-1]'
      : position === 'bottom-left'
      ? 'scale-y-[-1]'
      : position === 'bottom-right'
      ? 'scale-[-1]'
      : '';

  return (
    <div className={`pointer-events-none select-none ${transform} ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Soft Vine */}
        <path
          d="M 5 5 Q 35 45 40 85 Q 42 105 50 115"
          stroke="#54382F"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaves */}
        <path d="M 22 25 Q 40 20 35 38 Z" fill="#DCEFE3" stroke="#54382F" strokeWidth="2.5" />
        <path d="M 38 65 Q 60 62 50 80 Z" fill="#DCEFE3" stroke="#54382F" strokeWidth="2.5" />

        {/* Rose Flower */}
        <g transform="translate(15, 15)">
          <circle cx="20" cy="20" r="14" fill="#F6C9D2" stroke="#54382F" strokeWidth="3" />
          <path
            d="M 12 18 C 14 12 26 12 28 18 C 30 24 10 24 12 18 Z"
            fill="#ECA4B2"
            stroke="#54382F"
            strokeWidth="2"
          />
          <circle cx="20" cy="20" r="5" fill="#FFE8A3" />
        </g>

        {/* Little Daisy */}
        <g transform="translate(42, 75)">
          <circle cx="15" cy="15" r="5" fill="#FFE8A3" stroke="#54382F" strokeWidth="2" />
          <circle cx="15" cy="7" r="4" fill="#FFFFFF" stroke="#54382F" strokeWidth="1.5" />
          <circle cx="23" cy="15" r="4" fill="#FFFFFF" stroke="#54382F" strokeWidth="1.5" />
          <circle cx="15" cy="23" r="4" fill="#FFFFFF" stroke="#54382F" strokeWidth="1.5" />
          <circle cx="7" cy="15" r="4" fill="#FFFFFF" stroke="#54382F" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

// Floating Little Butterfly
export const CuteButterfly: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-block animate-float select-none ${className}`}>
      <svg width="40" height="34" viewBox="0 0 40 34" fill="none">
        {/* Wings */}
        <path
          d="M 20 18 C 14 8 2 10 4 20 C 6 26 18 22 20 18 Z"
          fill="#E8DFF8"
          stroke="#54382F"
          strokeWidth="2"
        />
        <path
          d="M 20 18 C 26 8 38 10 36 20 C 34 26 22 22 20 18 Z"
          fill="#F6C9D2"
          stroke="#54382F"
          strokeWidth="2"
        />
        {/* Body */}
        <ellipse cx="20" cy="18" rx="2" ry="7" fill="#54382F" />
        {/* Antennae */}
        <path d="M 19 12 Q 16 8 14 9" stroke="#54382F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 21 12 Q 24 8 26 9" stroke="#54382F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Section Divider with Flowers and Heart
export const RomanticDivider: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-3 my-8 select-none">
      <div className="h-[2px] w-16 sm:w-28 bg-[#54382F]/20 rounded-full" />
      <span className="text-xl animate-wiggle">🌷</span>
      {text && (
        <span className="text-sm font-bold tracking-wider uppercase text-chocolate/70 px-2 font-handwriting text-lg">
          {text}
        </span>
      )}
      <span className="text-sm animate-pulse">💗</span>
      <span className="text-xl animate-wiggle">🌼</span>
      <div className="h-[2px] w-16 sm:w-28 bg-[#54382F]/20 rounded-full" />
    </div>
  );
};
