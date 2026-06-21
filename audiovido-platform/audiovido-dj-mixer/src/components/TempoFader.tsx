import React, { useState, useRef } from 'react';

interface TempoFaderProps {
  onBpmChange: (bpm: number) => void;
}

const TempoFader: React.FC<TempoFaderProps> = ({ onBpmChange }) => {
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
    const { top, height } = trackRef.current.getBoundingClientRect();
    const newValue = 100 - ((e.clientY - top) / height) * 100;
    const newClampedValue = Math.max(0, Math.min(100, newValue));
    setValue(newClampedValue);
    const newBpm = 120 + (newClampedValue - 50) * 0.2; // Example BPM calculation
    onBpmChange(newBpm);
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span className="text-white text-sm mb-2">Tempo</span>
      <div
        ref={trackRef}
        className="bg-zinc-700 w-2 h-48 rounded-full relative"
        onMouseDown={handleMouseDown}
      >
        <div
          className="bg-cyan-500 w-4 h-4 rounded-full absolute"
          style={{ bottom: `${value}%`, transform: 'translateY(50%)' }}
        ></div>
      </div>
    </div>
  );
};

export default TempoFader;

