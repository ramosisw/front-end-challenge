const path = require("path");
const webpack = require("webpack");
const bundlePath = path.resolve(__dirname, "dist/");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {presets: ['env']}
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: 'dist/assets/images/',
                outputPath: 'assets/images/'
            }
        }, {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: 'dist/assets/images/svg/',
                outputPath: 'assets/images/svg/'
            }
        }, {
            test: /\.(otf)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: 'dist/assets/fonts/',
                outputPath: 'assets/fonts/'
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }]
        }]
    },
    resolve: {extensions: ['*', '.js', '.jsx']},
    output: {
        publicPath: bundlePath,
        filename: "[name].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        publicPath: "http://localhost:3000/dist"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    performance: false
};