const RawSource = require('webpack-sources').RawSource;

/**
 * Webpack File Preprocessor Plugin
 */
function WebpackFilePreprocessorPlugin(options) {
    this.options = Object.assign({
        debug: false
    }, options);

    // Configure your plugin with options...
}

WebpackFilePreprocessorPlugin.prototype.apply = function (compiler) {
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

            let processed = options.process(asset.source(), filename); // Trigger the process callback
            let size = asset.size();
            let processedSize = processed.length;
            let ratio = Number(100 - (processedSize * 100 / size)).toPrecision(3);

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
};

function isValidRegExp(value) {
    return value instanceof RegExp;
}

function isFunction(value) {
    return (typeof value === 'function');
}

function validateOptions(options) {
    const {pattern, process} = options;

    return (
        isValidRegExp(pattern) &&
        isFunction(process)
    );
}

/**
 * Loop through each key of an object.
 *
 * @param object
 * @param callback
 */
function forEach(object, callback) {
    for (var key in object) {
        if (!object.hasOwnProperty(key)) {
            continue;
        }

        callback(object[key], key);
    }
}

export default WebpackFilePreprocessorPlugin;
