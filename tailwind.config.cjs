module.exports = {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    screens: {
      lg: { min: '1280px' },
      xl: { min: '1440px' },
      '2xl': { min: '1920px' },
      md: { max: '991px' },
      sm: { max: '767px' },
      tn: { max: '478px' },
    },
    extend: {},
  },
  plugins: [],
};
