const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const minifyHtml = require('html-minifier').minify;

module.exports = {
  entry: ['./src/index.html'],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].html'
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
      pattern: /\.html$/,
      // Do your processing in this process function.
      process: source => minifyHtml(source.toString(), { collapseWhitespace: true })
    })
  ]
};
