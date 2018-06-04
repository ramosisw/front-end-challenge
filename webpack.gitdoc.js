const webpack = require("webpack");

const path = require("path");
const config = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(config, {
    devtool: 'source-map',
    mode: 'production',
    output: {
        publicPath: path.resolve(__dirname, './docs/dist/')
    }
});