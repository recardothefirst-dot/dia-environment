/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dia-dark': '#0f1419',
        'dia-darker': '#0a0e13',
        'dia-accent': '#2563eb',
        'dia-accent-light': '#3b82f6',
      },
    },
  },
  plugins: [],
}
