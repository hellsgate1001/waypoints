;(function(){
    'use strict';
    var tagFactory = function($resource){
        return $resource('http://api.waypoints.local/api/tags/tags/');
    };

    module.exports = tagFactory;
})();
