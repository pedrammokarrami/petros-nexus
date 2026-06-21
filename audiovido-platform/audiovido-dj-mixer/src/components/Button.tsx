import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-10 rounded-md text-white font-bold transition-all duration-200 ${
        isActive ? 'bg-cyan-500 shadow-cyan-glow' : 'bg-zinc-700'
      } hover:bg-cyan-600 active:scale-95`}
    >
      {label}
    </button>
  );
};

export default Button;
