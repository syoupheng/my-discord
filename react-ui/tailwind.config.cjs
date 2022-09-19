/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#3a3d40',
      'secondary': '#b7babd',
      'secondary-light': '#dddedf',
      'dark': '#1f2123',
      'white': '#ffffff',
      'red': '#ef4444',
      'danger': '#f38688',
      'blue': '#5966f3',
      'blue-hov': '#4153af',
      'link': '#00aff5'
    },
    // fontSize: {
    //   'xs': '.75rem',
    //   'sm': '.875rem',
    //   'tiny': '.975rem',
    //   'base': '1rem',
    //   'lg': '1.125rem',
    //   'xl': '1.25rem',
    //   '2xl': '1.5rem',
    //   '3xl': '1.875rem',
    //   '4xl': '2.25rem',
    //   '5xl': '3rem',
    //   '6xl': '3.75rem',
    //   '7xl': '4.5rem',
    //   '8xl': '6rem',
    //   '9xl': '8rem'
    // },
    extend: {},
  },
  plugins: [],
}
