;(function(){
    'use strict';

    module.exports = function(){
        // Javascript
        require('angular');
        require('angular-ui-router');
        require('angular-ui-bootstrap');
        require('angular-resource');
        require('angular-spinkit');

        // Styles
        require('../../node_modules/angular-spinkit/build/angular-spinkit.min.css')
        require('../scss/index.scss');
    };
})();
