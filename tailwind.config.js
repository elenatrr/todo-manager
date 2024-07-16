/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        link: 'var(--link-color)',
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        text: 'var(--text-color)',
        background: 'var(--background-color)',
        high: 'var(--high-color)',
        medium: 'var(--medium-color)',
        low: 'var(--low-color)',
        error: "#ff3e54"
      },
      animation: {
        'spin-once': 'spin 1s ease-in-out forwards',
        'shake': 'shake 0.8s ease-in-out'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}

