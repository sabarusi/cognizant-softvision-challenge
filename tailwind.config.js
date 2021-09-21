module.exports = {
  mode:'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'primary' : 'Arvo'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
