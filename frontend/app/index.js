;
import homeCtrl from './controllers/homeCtrl.js';

(function(){
    'use strict';

    var wp = angular.module('wp', ['ui.router', 'ui.bootstrap']);

    wp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        });
    }]);

    wp.controller('HomeCtrl', homeCtrl);

    module.exports = wp;
})();
