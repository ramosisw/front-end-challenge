/**
 * Build a production for github pages on https://ramosisw.github.io/front-end-challenge
 * @type {*}
 */
const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');

const config = require('./webpack.common.js');
const bundlePath = path.resolve(__dirname, "docs/dist/");

module.exports = merge(config, {
    output: {
        path: bundlePath,
        publicPath: bundlePath,
        filename: "[name].bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});