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
  // variants: {
  //   extend: {
  //     invert: ["hover"],
  //     sepia: ["hover"],
  //     hueRotate: ["hover"],
  //     saturate: ["hover"],
  //     brightness: ["hover"]
  //   },
  // },
  plugins: [
    require('tailwindcss-neumorphism'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
