module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './common/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      display: ['hover', 'focus, group-focus', 'group-hover'],
      animation: ['motion-safe'],
      visibility: ['hover', 'focus'],
    },
  },
  plugins: [],
}
