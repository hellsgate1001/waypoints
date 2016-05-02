(function(){
    'use strict';
    console.log('In webpack config');

    var webpack = require('webpack');
    var path = require('path');

    var APP = path.resolve(__dirname, './app');

    // Whitelist for environment variables: we don't want to load all of them
    var envWhitelist = ['API_BASE_URL'];

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
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': Object.keys(process.env).reduce(function(o, k){
                    if (envWhitelist.indexOf(k) >= 0) {
                        o[k] = JSON.stringify(process.env[k]);
                    }
                    return o;
                }, {})
            })
        ]
    };
})();
