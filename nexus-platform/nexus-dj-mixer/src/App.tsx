import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, FastForward, Rewind, RotateCcw } from 'lucide-react';

// To be moved to individual component files later

// --- Knob Component ---
const Knob = ({ label, size = 48 }: { label: string; size?: number }) => {
  const [rotation, setRotation] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startAngle = useRef(0);
  const currentAngle = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    const initialY = e.clientY;
    startAngle.current = initialY - currentAngle.current;
    document.body.style.cursor = 'ns-resize';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    let newAngle = e.clientY - startAngle.current;
    newAngle = Math.max(-135, Math.min(135, newAngle));
    currentAngle.current = newAngle;
    setRotation(newAngle);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">{label}</span>
      <div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        className="relative rounded-full bg-gradient-to-b from-zinc-800 to-black shadow-inner"
        style={{ width: size, height: size, cursor: 'grab' }}
      >
        <div 
          className="absolute inset-1 rounded-full bg-zinc-700"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-cyan-400 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};

// --- Fader Component ---
const Fader = ({ label, vertical = false }: { label: string; vertical?: boolean }) => {
  const [value, setValue] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateValue = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newValue;
    if (vertical) {
      newValue = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    } else {
      newValue = ((e.clientX - rect.left) / rect.width) * 100;
    }
    setValue(Math.max(0, Math.min(100, newValue)));
  }, [vertical]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    updateValue(e);
    document.body.style.cursor = vertical ? 'ns-resize' : 'ew-resize';
  }, [updateValue, vertical]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) {
      updateValue(e);
    }
  }, [updateValue]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const faderStyle = vertical ? { bottom: `${value}%` } : { left: `${value}%` };

  return (
    <div className={`flex items-center ${vertical ? 'flex-col h-48' : 'flex-row w-48'} justify-center`}>
      {label && <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase mb-1">{label}</span>}
      <div
        ref={trackRef}
        className="bg-black rounded-full relative cursor-pointer shadow-inner"
        style={vertical ? { width: '6px', height: '100%' } : { height: '6px', width: '100%' }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="bg-zinc-700 border-t border-zinc-600 w-6 h-10 rounded-sm absolute transform -translate-x-1/2 -translate-y-1/2"
          style={faderStyle}
        >
          <div className="w-full h-1/2 bg-gradient-to-b from-zinc-600 to-zinc-700"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

// --- Performance Pad ---
const PerformancePad = ({ color }: { color: string }) => {
    const [isPressed, setIsPressed] = useState(false);
    const shadowColor = `0 0 20px ${color}, inset 0 0 10px ${color}80`;

    return (
        <div
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className="w-16 h-14 rounded-lg cursor-pointer transition-all duration-100"
            style={{ 
                backgroundColor: color,
                boxShadow: isPressed ? shadowColor : 'inset 0 0 10px rgba(0,0,0,0.7)',
                transform: isPressed ? 'scale(0.96)' : 'scale(1)',
            }}
        />
    );
};

// --- Jog Wheel Component ---
const JogWheel = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastAngle = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef(0);

  const getAngle = useCallback((x: number, y: number) => {
    if (!wheelRef.current) return 0;
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(y - cy, x - cx) * (180 / Math.PI);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    lastAngle.current = getAngle(e.clientX, e.clientY);
    velocity.current = 0;
    cancelAnimationFrame(animationFrame.current);
    wheelRef.current!.style.cursor = 'grabbing';
  }, [getAngle]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const angle = getAngle(e.clientX, e.clientY);
    let diff = angle - lastAngle.current;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    velocity.current = diff * 1.5; // Amplify for scratching effect
    setRotation(prev => prev + diff);
    lastAngle.current = angle;
  }, [getAngle]);
  
  const tick = useCallback(() => {
      if (isDragging.current) return;
      if (Math.abs(velocity.current) > 0.05) {
          velocity.current *= 0.95; // Friction
          setRotation(prev => prev + velocity.current);
          animationFrame.current = requestAnimationFrame(tick);
      }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    wheelRef.current!.style.cursor = 'grab';
    animationFrame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="relative w-80 h-80">
      <div 
        ref={wheelRef}
        onMouseDown={handleMouseDown}
        className="w-full h-full rounded-full cursor-grab relative select-none"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: 'radial-gradient(circle at center, #4a4a4a 0%, #2a2a2a 40%, #111 70%, #000 100%)',
          boxShadow: 'inset 0 0 30px rgba(255,255,255,.1), inset 0 0 60px rgba(0,0,0,.8), 0 10px 30px rgba(0,0,0,.8)',
          border: '8px solid #333',
        }}
      >
        <div className="absolute inset-[18px] rounded-full bg-[conic-gradient(#666,#222,#555,#222,#777,#222)] animate-spin-slow"></div>
        <div className="absolute inset-[24px] rounded-full" style={{backgroundImage: `repeating-radial-gradient(circle at center, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 4px)`}}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-700 shadow-[inset_0_0_15px_white,_0_0_10px_black]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-400 shadow-[0_0_20px_#48b7ff]" />
        </div>
      </div>
      <div className="absolute inset-[-10px] rounded-full border-2 border-cyan-400/50 shadow-[0_0_20px_#06b6d4]"></div>
    </div>
  );
};

const DjButton = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <button 
    className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-zinc-900 transition-all duration-100 active:translate-y-1 ${className}`}
    style={{
      background: 'linear-gradient(180deg, #d0d0d0, #707070)',
      boxShadow: 'inset 0 2px 4px white, inset 0 -4px 8px rgba(0,0,0,.7), 0 6px 12px rgba(0,0,0,.6)',
    }}
  >
    {children}
  </button>
);

const DjButtonRect = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <button
        className={`w-24 h-12 rounded-lg flex items-center justify-center font-bold text-zinc-200 transition-all duration-100 active:translate-y-0.5 ${className}`}
        style={{
            background: 'linear-gradient(180deg, #5a5a5a, #2a2a2a)',
            boxShadow: 'inset 0 1px 2px white, inset 0 -2px 4px rgba(0,0,0,.7), 0 4px 8px rgba(0,0,0,.5)',
        }}
    >
        {children}
    </button>
);


// --- Deck Component ---
const Deck = ({ deckId }: { deckId: 'A' | 'B' }) => {
    const padColors = ["#00b7ff", "#00ff7f", "#ff00ff", "#ff7f00", "#ffff00", "#7f00ff", "#ff0000", "#00ffff"];
    return (
        <div className="w-[45%] h-full bg-zinc-800/50 rounded-xl p-4 flex flex-col items-center justify-between border border-black">
            {/* Top controls */}
            <div className="w-full flex justify-between items-center">
                <span className="text-2xl font-bold text-cyan-400">{deckId}</span>
                <div className="flex items-center space-x-2 text-xs font-mono bg-black/50 px-2 py-1 rounded">
                    <span>124.0</span>
                    <span>+0.00%</span>
                </div>
            </div>

            <JogWheel />
            
            {/* Performance Pads */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                {padColors.map((color, i) => <PerformancePad key={i} color={color} />)}
            </div>

            {/* Transport Controls */}
            <div className="flex items-center justify-center space-x-4">
              <DjButton><Play size={32} /></DjButton>
              <DjButton>CUE</DjButton>
              <DjButtonRect>SYNC</DjButtonRect>
            </div>
        </div>
    )
}

// --- App Component ---
export default function App() {
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4 font-sans" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%231a1a1a\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}>
      <div className="w-full max-w-[1400px] h-[700px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 p-4 flex justify-between items-center space-x-4">
        <Deck deckId="A" />
        <div className="w-[10%] h-full bg-zinc-800/50 rounded-xl p-4 flex flex-col items-center justify-around border border-black">
          <Knob label="Browse" size={64}/>
          <Fader label="Master" vertical={true} />
          <div className="w-full">
            <Fader label="" vertical={false} />
          </div>
        </div>
        <Deck deckId="B" />
      </div>
    </div>
  );
}
