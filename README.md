# Webpack File Preprocessor Plugin

[![NPM Version](https://img.shields.io/npm/v/webpack-file-preprocessor-plugin.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)
[![NPM Downloads](https://img.shields.io/npm/dt/webpack-file-preprocessor-plugin.svg?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)
[![Travis Build](https://img.shields.io/travis/com/kabirbaidhya/webpack-file-preprocessor-plugin/master?style=flat-square&color=brightgreen)](https://travis-ci.com/kabirbaidhya/webpack-file-preprocessor-plugin)
[![Code Coverage](https://img.shields.io/codecov/c/github/kabirbaidhya/webpack-file-preprocessor-plugin/master?style=flat-square&color=brightgreen)](https://codecov.io/gh/kabirbaidhya/webpack-file-preprocessor-plugin)
[![NPM license](https://img.shields.io/npm/l/webpack-file-preprocessor-plugin?style=flat-square&color=brightgreen)](https://github.com/kabirbaidhya/webpack-file-preprocessor-plugin/blob/master/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/kabirbaidhya/webpack-file-preprocessor-plugin/pulls)

A lightweight yet generic webpack plugin for pre-processing assets before emitting.

## Installation

```bash
# Using npm
$ npm install webpack-file-preprocessor-plugin --save-dev

# Using Yarn
$ yarn add webpack-file-preprocessor-plugin --dev
```

## Usage

This example demonstrates how to use this plugin to minify the html assets loaded using `file-loader`.

```javascript
const WebpackFilePreprocessorPlugin = require('webpack-file-preprocessor-plugin');
const minifyHtml = require('html-minifier').minify;

module.exports = {
  entry: {
    app: './index.js'
  },
  output: {
    path: './public/dist',
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'tmpl/[hash].html'
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
      process: source => minifyHtml(source.toString())
    })
  ]
};
```

This example demonstrates how to use this plugin to minify the css assets loaded using `mini-css-extract-plugin`.

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/style.css'],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              }
            }
          },
          {
            loader: 'css-loader',
            options: {}
          }
        ],
      },
    ],
  },
};
```

## Examples

1. [HTML Minifier](examples/html-minifier) - A simple example of minifying raw HTML files before they're emitted using this plugin.
2. [JS Minifier](examples/js-minifier) - A simple example of minifying javascript files before they're emitted using this plugin.
3. [CSS Minifier](examples/css-minifier) - A simple example of minifying css files before they're emitted using this plugin.

## Changelog

Check the [CHANGELOG](CHANGELOG.md) for release history.

## License

Licensed under [MIT](LICENSE).
