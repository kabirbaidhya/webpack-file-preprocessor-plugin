import { RawSource } from 'webpack-sources';
import { validateOptions } from './util';

/**
 * Webpack File Preprocessor Plugin
 */
class WebpackFilePreprocessorPlugin {
  constructor(options) {
    this.options = { debug: false, ...options };
  }

  apply(compiler) {
    const { options } = this;

    if (!validateOptions(options)) {
      console.warn('WARNING WebpackFilePreprocessorPlugin instantiated with invalid options.');

      return;
    }

    compiler.hooks.emit.tapAsync('WebpackFilePreprocessorPlugin', (compilation, callback) => {
      if (options.debug === true) {
        console.info('Preprocessing Assets:\n');
      }

      // Loop through the compilation assets
      Object.keys(compilation.assets).map((filename) => {
        if (!options.pattern.test(filename)) {
          return;
        }

        const asset = compilation.assets[filename];

        const processed = options.process(asset.source(), filename); // Trigger the process callback
        const size = asset.size();
        const processedSize = processed.length;
        const ratio = Number(100 - ((processedSize * 100) / size)).toPrecision(3);

        if (options.debug === true) {
          console.info(` - ${filename} \t\t${size}B -> ${processedSize}B\t\t[${ratio} %]`);
        }

        // Replace the source file with minified html
        // eslint-disable-next-line no-param-reassign
        compilation.assets[filename] = new RawSource(processed);
      });

      if (options.debug === true) {
        console.info('\n');
      }

      callback();
    });
  }
}

export default WebpackFilePreprocessorPlugin;
