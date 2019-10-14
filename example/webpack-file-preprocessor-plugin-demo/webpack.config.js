const WebpackFilePreprocessorPlugin = require('@jkroepke/webpack-file-preprocessor-plugin');

const minifyHtml = require('html-minifier').minify;

module.exports = config => {
  config.plugins.push(
    new WebpackFilePreprocessorPlugin({
      pattern: /\.(svg)$/,
      process: source => minifyHtml(source.toString(), {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
      }),
    })
  );

  config.plugins.push(
    new WebpackFilePreprocessorPlugin({
      pattern: /\.(json)$/,
      process: source => JSON.stringify(JSON.parse(source)),
    })
  );

  return config;
};
