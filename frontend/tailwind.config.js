/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ahmed: {
          green: '#2d6a4f',
          lightGreen: '#52b788',
          emerald: '#40916c',
          darkGreen: '#1b4332',
          gold: '#d4af37',
          goldLight: '#f3c64c',
          dark: '#1a1a2e',
          darker: '#121224',
          card: 'rgba(26, 26, 46, 0.88)',
          surface: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(82, 183, 136, 0.25)',
          borderGold: 'rgba(212, 175, 55, 0.35)',
          text: '#ffffff',
          secondary: '#b0bec5',
          success: '#4caf50',
          warning: '#ff9800',
          danger: '#f44336',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-gold': '0 8px 32px 0 rgba(212, 175, 55, 0.15)',
        'glass-green': '0 8px 32px 0 rgba(82, 183, 136, 0.18)',
        'glow-green': '0 0 15px rgba(82, 183, 136, 0.4)',
        'glow-gold': '0 0 15px rgba(212, 175, 55, 0.4)',
      },
    },
  },
  plugins: [],
};


