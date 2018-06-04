const path = require("path");
const bundlePath = path.resolve(__dirname, "docs/dist/");
const config = require('./webpack.config.js');
const merge = require('webpack-merge');

module.exports = merge(config, {
    output: {
        publicPath: bundlePath
    }
});