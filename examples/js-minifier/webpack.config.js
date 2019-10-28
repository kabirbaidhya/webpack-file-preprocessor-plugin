const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const minifyJS = require('uglify-js').minify;

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  plugins: [
    new WebpackFilePreprocessorPlugin({
      // Prints processed assets if set to true (default: false)
      debug: true,
      // RegExp pattern to filter assets for pre-processing.
      pattern: /index\.js$/,
      // Do your processing in this process function.
      process: source => minifyJS(
        source.toString()
      )
    })
  ]
};
