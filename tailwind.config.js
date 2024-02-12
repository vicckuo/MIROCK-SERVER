/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      extend: {
        colors: {
          'primary-dark': '#1b1a1a',
          primary: '#ffffff',
          highlight: {
            dark: '#FFFFFF',
            light: '#195d7e',
          },
          secondary: {
            dark: '#707070',
            light: '#e6e6e6',
          },

          action: '#195d7e',
        },
        transitionProperty: {
          width: 'width',
        },
      },
    },
  },
  plugins: [],
};
