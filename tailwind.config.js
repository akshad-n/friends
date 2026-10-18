/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCF8',
          100: '#FFF8F0',
          200: '#FDEFD9',
        },
        blush: {
          50: '#FDF0F3',
          100: '#F9DFE5',
          200: '#F6C9D2',
          300: '#EEA2B2',
        },
        rose: {
          soft: '#ECA4B2',
          deep: '#D87A8C',
        },
        lavender: {
          soft: '#E8DFF8',
          100: '#F1ECFA',
          300: '#CDBBF0',
        },
        butter: {
          50: '#FFF9E5',
          100: '#FFE8A3',
          200: '#FED870',
        },
        mint: {
          50: '#F0F9F4',
          100: '#DCEFE3',
          200: '#BAE2C7',
        },
        chocolate: {
          DEFAULT: '#54382F',
          light: '#724E43',
          dark: '#3D2720',
        },
      },
      fontFamily: {
        sans: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', '"Itim"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'cute': '0 8px 24px -4px rgba(84, 56, 47, 0.08), 0 4px 8px -2px rgba(84, 56, 47, 0.04)',
        'cute-lg': '0 16px 32px -4px rgba(84, 56, 47, 0.12), 0 6px 12px -2px rgba(84, 56, 47, 0.06)',
        'glow-pink': '0 0 20px rgba(246, 201, 210, 0.6)',
        'glow-lavender': '0 0 20px rgba(232, 223, 248, 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceCute: {
          '0%, 100%': { transform: 'translateY(0) scale(1, 1)' },
          '30%': { transform: 'translateY(-14px) scale(0.96, 1.05)' },
          '50%': { transform: 'translateY(0) scale(1.05, 0.95)' },
          '70%': { transform: 'translateY(-4px) scale(0.99, 1.01)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '80%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(1.1)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        wiggle: 'wiggle 1.5s ease-in-out infinite',
        'bounce-cute': 'bounceCute 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        sway: 'sway 4s ease-in-out infinite',
        'heart-float': 'heartFloat 4s ease-in infinite',
      }
    },
  },
  plugins: [],
}
