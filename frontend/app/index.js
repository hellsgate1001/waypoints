// Import controllers
import homeCtrl from './controllers/homeCtrl.js';
import modalCtrl from './controllers/modalCtrl.js';
import tagCloudCtrl from './controllers/tagCloudCtrl.js';

// Import directives
import headerDirective from './directives/headerDirective.js';
import footerDirective from './directives/footerDirective.js';

// Import factories and services
import Tag from './factories/tagFactory.js';

(function(){
    'use strict';

    var wp = angular.module('wp', ['ui.router', 'ui.bootstrap', 'ngResource']);

    wp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                },
                'tagCloud': {
                    templateUrl: 'templates/partials/tagCloud.html',
                    controller: 'TagCloudCtrl'
                }
            }
        });

    }]);

    wp.controller('HomeCtrl', homeCtrl);
    wp.controller('ModalCtrl', modalCtrl);
    wp.controller('TagCloudCtrl', tagCloudCtrl);

    wp.directive('headerDirective', headerDirective);
    wp.directive('footerDirective', footerDirective);

    wp.factory('Tag', Tag);

    module.exports = wp;
})();
