import React, { useState } from 'react';
import JogWheel from './JogWheel';
import Button from './Button';
import PerformancePads from './PerformancePads';
import Waveform from './Waveform';
import TempoFader from './TempoFader';

const Deck: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCue, setIsCue] = useState(false);
  const [isSync, setIsSync] = useState(false);
  const [bpm, setBpm] = useState(120);

  return (
    <div className="w-1/2 p-4 flex items-center">
      <div className="flex flex-col items-center">
        <Waveform />
        <JogWheel />
        <div className="flex space-x-4 mt-4">
          <Button label="Play/Pause" onClick={() => setIsPlaying(!isPlaying)} isActive={isPlaying} />
          <Button label="Cue" onClick={() => setIsCue(!isCue)} isActive={isCue} />
          <Button label="Sync" onClick={() => setIsSync(!isSync)} isActive={isSync} />
        </div>
        <PerformancePads />
      </div>
      <div className="ml-4 flex flex-col items-center">
        <div className="text-white text-2xl mb-4">{bpm.toFixed(1)}</div>
        <TempoFader onBpmChange={setBpm} />
      </div>
    </div>
  );
};

export default Deck;




