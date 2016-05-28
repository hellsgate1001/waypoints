// Import controllers
import homeCtrl from './controllers/homeCtrl.js';
import modalCtrl from './controllers/modalCtrl.js';
import tagCloudCtrl from './controllers/tagCloudCtrl.js';
import loginCtrl from './controllers/loginCtrl.js';

// Import directives
import headerDirective from './directives/headerDirective.js';
import footerDirective from './directives/footerDirective.js';

// Import factories and services
import Tag from './factories/tagFactory.js';
import Bookmark from './factories/bookmarkFactory.js';

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
        }).state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        });

    }]);

    wp.controller('HomeCtrl', homeCtrl);
    wp.controller('ModalCtrl', modalCtrl);
    wp.controller('TagCloudCtrl', tagCloudCtrl);
    wp.controller('LoginCtrl', loginCtrl);

    wp.directive('headerDirective', headerDirective);
    wp.directive('footerDirective', footerDirective);

    wp.factory('Tag', Tag);
    wp.factory('Bookmark', Bookmark);

    module.exports = wp;
})();
