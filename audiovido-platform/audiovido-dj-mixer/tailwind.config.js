/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-lg': 'inset 0 10px 15px rgba(0, 0, 0, 0.5)',
        'cyan-glow': '0 0 15px rgba(6, 182, 212, 0.8)',
        'green-glow': '0 0 15px rgba(34, 197, 94, 0.8)',
        'purple-glow': '0 0 15px rgba(168, 85, 247, 0.8)',
        'pink-glow': '0 0 15px rgba(236, 72, 153, 0.8)',
        'blue-glow': '0 0 15px rgba(59, 130, 246, 0.8)',
        'yellow-glow': '0 0 15px rgba(234, 179, 8, 0.8)',
        'red-glow': '0 0 15px rgba(239, 68, 68, 0.8)',
        'indigo-glow': '0 0 15px rgba(99, 102, 241, 0.8)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  plugins: [],
}
