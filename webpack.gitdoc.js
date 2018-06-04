const webpack = require("webpack");

const path = require("path");
const config = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(config, {
    mode: 'production',
    output: {
        publicPath: path.resolve(__dirname, './docs/dist/')
    }
});