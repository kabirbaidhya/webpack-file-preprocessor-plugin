# Webpack File Preprocessor Plugin
[![NPM Version](https://img.shields.io/npm/v/webpack-file-preprocessor-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)
[![NPM Downloads](https://img.shields.io/npm/dt/webpack-file-preprocessor-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-file-preprocessor-plugin)

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
const webpack = require('webpack');
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
            process: (source) => minifyHtml(source.toString())
        })
    ]
};
```