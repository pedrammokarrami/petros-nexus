import React, { useState, useRef } from 'react';

interface FaderProps {
  label: string;
  vertical?: boolean;
}

const Fader: React.FC<FaderProps> = ({ label, vertical = false }) => {
  const [value, setValue] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateValue(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      updateValue(e);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const updateValue = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const { top, left, width, height } = trackRef.current.getBoundingClientRect();
    let newValue;
    if (vertical) {
      newValue = 100 - ((e.clientY - top) / height) * 100;
    } else {
      newValue = ((e.clientX - left) / width) * 100;
    }
    setValue(Math.max(0, Math.min(100, newValue)));
  };

  const faderStyle = vertical
    ? { bottom: `${value}%`, transform: 'translateY(50%)' }
    : { left: `${value}%`, transform: 'translateX(-50%)' };

  return (
    <div
      className={`flex items-center ${vertical ? 'flex-col' : 'flex-row'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span className="text-white text-sm mb-2">{label}</span>
      <div
        ref={trackRef}
        className={`bg-zinc-700 rounded-full relative ${
          vertical ? 'w-2 h-48' : 'h-2 w-48'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div
          className="bg-cyan-500 w-4 h-4 rounded-full absolute"
          style={faderStyle}
        ></div>
      </div>
    </div>
  );
};

export default Fader;

