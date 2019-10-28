# Webpack File Preprocessor Plugin
[![NPM Version](https://img.shields.io/npm/v/webpack-file-preprocessor-plugin.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)&nbsp; [![Travis Build](https://img.shields.io/travis/com/kabirbaidhya/webpack-file-preprocessor-plugin/master?style=flat-square&color=brightgreen)](https://travis-ci.com/kabirbaidhya/webpack-file-preprocessor-plugin)&nbsp; [![Code Coverage](https://img.shields.io/codecov/c/github/kabirbaidhya/webpack-file-preprocessor-plugin/master?style=flat-square&color=brightgreen)](https://codecov.io/gh/kabirbaidhya/webpack-file-preprocessor-plugin)&nbsp; [![NPM license](https://img.shields.io/npm/l/webpack-file-preprocessor-plugin?style=flat-square&color=brightgreen)](https://github.com/kabirbaidhya/webpack-file-preprocessor-plugin/blob/master/LICENSE)&nbsp; [![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/kabirbaidhya/webpack-file-preprocessor-plugin/pulls)&nbsp; [![NPM Downloads](https://img.shields.io/npm/dt/webpack-file-preprocessor-plugin.svg?style=flat-square&color=brightgreen)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)

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
