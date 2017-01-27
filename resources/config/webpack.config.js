const config = require('./common.config');

module.exports = {
    output: Object.assign({
        library: 'get',
        libraryTarget: 'window'
    }, config.output),
    entry: {
        'get': './index'
    }
};
