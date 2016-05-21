;(function(){
    'use strict';
    var tagFactory = function($resource){
        return $resource(process.env.API_BASE_URL + 'api/tags/tags/');
    };

    module.exports = tagFactory;
})();
