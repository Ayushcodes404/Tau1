/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retro: {
          primary: '#8B4513',
          secondary: '#DEB887',
          accent: '#CD853F',
          light: '#FFF8DC',
          dark: '#654321'
        }
      },
      boxShadow: {
        'retro': '2px 2px 0 rgba(0, 0, 0, 0.1)',
        'retro-lg': '4px 4px 0 rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};