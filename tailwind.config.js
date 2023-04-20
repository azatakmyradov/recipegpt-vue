/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#BF4342',
        'secondary': '#8C1C13',
        'almond': '#E7D7C1',
        'beaver': '#A78A7F',
        'liver': '#735751'
      }
    },
  },
  plugins: [],
}

