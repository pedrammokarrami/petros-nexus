import React, { useState, useRef } from 'react';

interface KnobProps {
  label: string;
}

const Knob: React.FC<KnobProps> = ({ label }) => {
  const [angle, setAngle] = useState(0);
  const isDragging = useRef(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startAngle = useRef(0);
  const currentAngle = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startAngle.current = getAngle(e.clientY) - currentAngle.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      let newAngle = getAngle(e.clientY) - startAngle.current;
      newAngle = Math.max(-135, Math.min(135, newAngle)); // Limit rotation
      currentAngle.current = newAngle;
      setAngle(newAngle);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const getAngle = (y: number) => {
    if (!knobRef.current) return 0;
    const { top, height } = knobRef.current.getBoundingClientRect();
    const centerY = top + height / 2;
    return (y - centerY) * 2; // Sensitivity
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span className="text-white text-sm mb-2">{label}</span>
      <div
        ref={knobRef}
        className="w-16 h-16 bg-zinc-700 rounded-full relative"
        style={{ transform: `rotate(${angle}deg)` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1 left-1/2 w-px h-2 bg-cyan-400 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default Knob;

