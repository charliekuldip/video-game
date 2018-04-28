const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const path = require("path");

module.exports = {
    entry: {
        app: ["./src/js/app.js"],
        vendor: ['imagesloaded', 'promise', 'qs', 'slick-carousel', 'onscreen', 'vanilla-tilt']
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_module)/,
                loader: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "app.bundle.js"
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].bundle.min.js'
        }),
        new BellOnBundlerErrorPlugin()
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src/js'), "node_modules"],
        extensions: ['.js', '.json']
    }
    // externals: {
    //     'jquery': 'jQuery'
    // }
};