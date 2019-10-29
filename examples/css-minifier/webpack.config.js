const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const crass = require('crass').parse;

module.exports = {
  mode: 'production',
  entry: ['./src/style.css'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].css'
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
      pattern: /\.css$/,
      // Do your processing in this process function.
      process: source => crass(source.toString()).optimize().toString()
    })
  ]
};

