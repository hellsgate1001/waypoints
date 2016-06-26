(function(){
    'use strict';
    var webpack = require('webpack');
    var path = require('path');
    var sassLintPlugin = require('sasslint-webpack-plugin');

    var APP = path.resolve(__dirname, './app');

    // Whitelist for environment variables: we don't want to load all of them
    var envWhitelist = ['API_BASE_URL', 'HOME'];

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
            }),
            new sassLintPlugin({
                configFile: '.sass-lint.yml',
                ignoreFiles: [
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/materialize.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_switches.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_select.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_range.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_radio-buttons.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_input-fields.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_forms.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_file-input.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/forms/_checkboxes.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/date_picker/_default.time.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/date_picker/_default.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/date_picker/_default.date.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_waves.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_variables.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_typography.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_tooltip.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_toast.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_tabs.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_table_of_contents.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_slider.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_sideNav.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_roboto.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_preloader.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_prefixer.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_normalize.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_navbar.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_modal.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_mixins.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_materialbox.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_icons-material-design.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_grid.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_global.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_dropdown.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_color.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_collapsible.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_chips.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_carousel.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_cards.scss'),
                    path.resolve(__dirname, 'app/scss/materialize-src/sass/components/_buttons.scss')
                ]
            })
        ]
    };
})();
