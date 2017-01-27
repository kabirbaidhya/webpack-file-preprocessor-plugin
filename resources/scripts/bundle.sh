#!/bin/sh

# Clean previously bundled files 
rm -rf dist/

# Build the main library files
webpack -d --config=resources/config/webpack.config.js
NODE_ENV=production webpack -p --config=resources/config/webpack.config.js

# Build the angular module files
webpack -d --config=resources/config/webpack.angular.config.js
NODE_ENV=production webpack -p --config=resources/config/webpack.angular.config.js