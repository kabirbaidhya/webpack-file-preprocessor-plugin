import { RawSource } from 'webpack-sources';
import { validateOptions, forEach } from './util';

/**
 * Webpack File Preprocessor Plugin
 */
class WebpackFilePreprocessorPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        debug: false
      },
      options
    );
  }

  apply(compiler) {
    const options = this.options;

    if (!validateOptions(options)) {
      console.warn('WARNING WebpackFilePreprocessorPlugin instantiated with invalid options.');

      return;
    }

    compiler.plugin('emit', (compilation, callback) => {
      if (options.debug === true) {
        console.info('Preprocessing Assets:\n');
      }

      // Loop through the compilation assets
      forEach(compilation.assets, (asset, filename) => {
        if (!options.pattern.test(filename)) {
          return;
        }

        const processed = options.process(asset.source(), filename); // Trigger the process callback
        const size = asset.size();
        const processedSize = processed.length;
        const ratio = Number(100 - (processedSize * 100) / size).toPrecision(3);

        if (options.debug === true) {
          console.info(` - ${filename} \t\t${size}B -> ${processedSize}B\t\t[${ratio} %]`);
        }

        // Replace the source file with minified html
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
