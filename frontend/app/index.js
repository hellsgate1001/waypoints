// Import controllers
import homeCtrl from './controllers/homeCtrl.js';
import modalCtrl from './controllers/modalCtrl.js';

// Import directives
import headerDirective from './directives/headerDirective.js';
import footerDirective from './directives/footerDirective.js';

(function(){
    'use strict';

    var wp = angular.module('wp', ['ui.router', 'ui.bootstrap']);

    wp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        });

    }]);

    wp.controller('HomeCtrl', homeCtrl);
    wp.controller('ModalCtrl', modalCtrl);

    wp.directive('headerDirective', headerDirective);
    wp.directive('footerDirective', footerDirective);

    module.exports = wp;
})();
