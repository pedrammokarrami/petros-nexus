import React, { useState } from 'react';

const padColors = [
  'bg-cyan-500 shadow-cyan-glow',
  'bg-green-500 shadow-green-glow',
  'bg-purple-500 shadow-purple-glow',
  'bg-pink-500 shadow-pink-glow',
  'bg-blue-500 shadow-blue-glow',
  'bg-yellow-500 shadow-yellow-glow',
  'bg-red-500 shadow-red-glow',
  'bg-indigo-500 shadow-indigo-glow',
];

const PerformancePads: React.FC = () => {
  const [activePad, setActivePad] = useState<number | null>(null);

  const handlePadClick = (index: number) => {
    setActivePad(index);
    console.log(`Hot Cue ${index + 1} triggered`);
    setTimeout(() => setActivePad(null), 200);
  };

  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`w-16 h-16 rounded-md transition-all duration-200 ${
            activePad === i ? padColors[i] : 'bg-zinc-700'
          } hover:scale-105 active:scale-95 cursor-pointer`}
          onClick={() => handlePadClick(i)}
        ></div>
      ))}
    </div>
  );
};

export default PerformancePads;

