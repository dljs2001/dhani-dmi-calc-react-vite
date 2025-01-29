/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-red': {
          light: '#840704',
          dark: '#3A0101'
        }
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(to bottom, #840704, #3A0101)'
      }
    },
  },
  plugins: [],
};