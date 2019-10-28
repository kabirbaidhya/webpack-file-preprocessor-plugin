const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const { minify } = require('uglify-js');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].js'
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackFilePreprocessorPlugin({
      // Prints processed assets if set to true (default: false)
      debug: true,
      // RegExp pattern to filter assets for pre-processing.
      pattern: /\.js$/,
      // Do your processing in this process function.
      process: source => minify(source.toString()).code
    })
  ]
};
