// Import controllers
import headerCtrl from './controllers/headerCtrl.js';
import homeCtrl from './controllers/homeCtrl.js';
import tagCloudCtrl from './controllers/tagCloudCtrl.js';
import loginCtrl from './controllers/loginCtrl.js';
import addBookmarkModalCtrl from './controllers/addBookmarkModalCtrl.js';

// Import directives
import headerDirective from './directives/headerDirective.js';
import footerDirective from './directives/footerDirective.js';

// Import factories
import Tag from './factories/tagFactory.js';
import Bookmark from './factories/bookmarkFactory.js';
import AuthInterceptor from './factories/authInterceptorFactory.js';

// Import services
import auth from './services/authService.js';
import user from './services/userService.js';
import wpModal from './services/modalService.js';

(function(){
    'use strict';

    var wp = angular.module('wp', ['ui.router', 'ui.bootstrap', 'ngResource', 'angular-spinkit']);

    wp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
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

        $httpProvider.interceptors.push('AuthInterceptor');
    }]);

    wp.controller('HeaderCtrl', headerCtrl);
    wp.controller('HomeCtrl', homeCtrl);
    wp.controller('TagCloudCtrl', tagCloudCtrl);
    wp.controller('LoginCtrl', loginCtrl);
    wp.controller('AddBookmarkModalCtrl', addBookmarkModalCtrl);

    wp.directive('headerDirective', headerDirective);
    wp.directive('footerDirective', footerDirective);

    wp.factory('Tag', Tag);
    wp.factory('Bookmark', Bookmark);
    wp.factory('AuthInterceptor', AuthInterceptor);

    wp.service('auth', auth);
    wp.service('user', user);
    wp.service('wpModal', wpModal);

    module.exports = wp;
})();
