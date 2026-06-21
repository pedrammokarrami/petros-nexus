import React, { useState, useRef, useEffect } from 'react';

const JogWheel: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const isDragging = useRef(false);
  const prevAngle = useRef(0);
  const velocity = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    prevAngle.current = getAngle(e.clientX, e.clientY);
    velocity.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      const newAngle = getAngle(e.clientX, e.clientY);
      const delta = newAngle - prevAngle.current;
      velocity.current = delta;
      setAngle((prev) => prev + delta);
      prevAngle.current = newAngle;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const getAngle = (x: number, y: number) => {
    if (!wheelRef.current) return 0;
    const { top, left, width, height } = wheelRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  };

  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && Math.abs(velocity.current) > 0.01) {
        velocity.current *= 0.95; // Friction
        setAngle((prev) => prev + velocity.current);
      }
      requestAnimationFrame(tick);
    };
    const animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={wheelRef}
      className="relative w-64 h-64"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner-lg"></div>
      <div className="absolute inset-2 rounded-full bg-zinc-900"></div>
      <div className="absolute inset-4 rounded-full bg-zinc-800"></div>
      <div className="absolute inset-6 rounded-full bg-zinc-900"></div>
      <div className="absolute inset-8 rounded-full bg-zinc-800"></div>
      <div className="absolute inset-10 rounded-full bg-zinc-700"></div>
      <div className="absolute inset-12 rounded-full bg-zinc-600"></div>
      <div className="absolute inset-14 rounded-full bg-zinc-500"></div>
      <div className="absolute inset-16 rounded-full bg-zinc-400"></div>

      {/* Silver center */}
      <div className="absolute inset-20 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 flex items-center justify-center">
        <span className="text-zinc-800 font-bold text-sm">VINYL</span>
      </div>

      {/* Blue glowing ring */}
      <div className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-50 shadow-cyan-glow animate-pulse"></div>
    </div>
  );
};

export default JogWheel;


