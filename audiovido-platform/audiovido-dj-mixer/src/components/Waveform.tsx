import React, { useMemo } from 'react';

const Waveform: React.FC = () => {
  const waveformData = useMemo(() => {
    return Array.from({ length: 100 }, () => Math.random());
  }, []);

  return (
    <div className="w-full h-16 bg-zinc-800 rounded-md mt-4 flex items-center justify-center space-x-px">
      {waveformData.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-cyan-400"
          style={{ height: `${height * 100}%` }}
        ></div>
      ))}
    </div>
  );
};

export default Waveform;

