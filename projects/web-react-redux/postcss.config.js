module.exports = {
  plugins: [require('postcss-flexbugs-fixes'), require('autoprefixer'), require('postcss-px2rem')({remUnit: 75})],
};
