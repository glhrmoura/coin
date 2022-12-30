module.exports = {
  mode: 'jit',

  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    colors: {
      white: '#FFFFFF',

      black: '#000000',

      transparent: 'transparent',

      yellow: {
        medium: '#FFBC00',
      },

      grey: {
        light: '#ADADAD',

        medium: '#8F8F8F',

        dark: '#333333',
  
        darker: '#2E2E2E',
      }
    }
  },
}