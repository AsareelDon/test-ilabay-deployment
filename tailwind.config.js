/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cgreen": "#569956",
        "dark-green": "#498349",
        "light-green": "#8dbf8d",
        "w-green": "#e6ffe6",
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

