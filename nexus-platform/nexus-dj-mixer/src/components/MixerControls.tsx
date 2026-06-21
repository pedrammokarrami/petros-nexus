import React from 'react';
import Fader from './Fader';
import Knob from './Knob';

const MixerControls: React.FC = () => {
  return (
    <div className="w-1/4 h-full bg-zinc-800 p-4 flex flex-col justify-around items-center">
      <div className="flex justify-around w-full">
        <Knob label="FX 1" />
        <Knob label="FX 2" />
        <Knob label="FX 3" />
      </div>
      <div className="flex justify-around w-full">
        <Fader label="Channel A" vertical />
        <Fader label="Channel B" vertical />
      </div>
      <Fader label="Crossfader" />
      <Fader label="Master" vertical />
    </div>
  );
};

export default MixerControls;



