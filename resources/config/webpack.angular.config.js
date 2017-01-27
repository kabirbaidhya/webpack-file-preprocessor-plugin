const config = require('./common.config');

module.exports = {
    output: config.output,
    entry: {
        'angular-get': './angular'
    },
    externals: {
        'angular': 'angular'
    }
};
