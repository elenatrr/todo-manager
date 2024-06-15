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
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        text: 'var(--text-color)',
        background: 'var(--background-color)',
        high: 'var(--high-color)',
        medium: 'var(--medium-color)',
        low: 'var(--low-color)',
      },
      animation: {
        'spin-once': 'spin 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

