;(function(){
    'use strict';
    var headerDirective = function() {
        return {
            templateUrl: 'templates/partials/header.html',
            controller: 'HeaderCtrl'
        };
    };

    module.exports = headerDirective;
})();
