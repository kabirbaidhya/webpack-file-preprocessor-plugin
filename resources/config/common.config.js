const path = require('path');
const prefix = (process.env.NODE_ENV === 'production') ? '.min.js' : '.js';

module.exports = {
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name]' + prefix
    }
};
