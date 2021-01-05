const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: process.env.NODE_ENV,
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  entry: ['./src/vue-yup-form-validation.js'],
  output: {
    library: 'VueYupFormValidation',
    libraryTarget: 'umd',
    filename: 'index.js',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
