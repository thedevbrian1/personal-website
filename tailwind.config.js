/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1F2028',
        'slightly-lighter-dark-blue': '#2E3039',
        'brand-orange': '#F38016',
        'body-white': '#DADADA'
      }
    },
    fontFamily: {
      'heading': ['"Libre Baskerville"', 'sans-serif'],
      'body': ['"Source Sans 3"', 'sans-serif']
    }
  },
  plugins: [],
};
