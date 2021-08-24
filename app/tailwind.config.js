module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        roxo_prati: '#5C2472',
        amarelo_prati: '#F3CC23',
      },
      spacing: {
        '70px': '70px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
