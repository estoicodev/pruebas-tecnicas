/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        minxs: '400px',
        xs: '425px',
        ml: '900px'
      }
    }
  },
  plugins: []
}
