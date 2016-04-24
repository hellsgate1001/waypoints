(function(){
    'use strict';

    var path = require('path');

    var APP = path.resolve(__dirname, './app');

    module.exports = {
        context: APP,
        entry: {
            app: './core/bootstrap.js'
        },
        resolve: {
            alias: {
                'ngRoute': 'angular-ui-router'
            }
        },
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.scss$/,
                    loader: 'style!css!sass'
                },
                {
                    test: /\.css$/,
                    loader: 'style!css'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
                },
                {
                    test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000"
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"
                }
            ]
        }
    };
})();
