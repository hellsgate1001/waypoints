;(function(){
    'use strict';
    var tagFactory = function($resource){
        return $resource(
            'http://127.0.0.1:8010/api/tags/tags/',
            null,
            {
                query: {
                    isArray: true,
                    params: {offset: '@offset'},
                    transformResponse: function(data){
                        return JSON.parse(data);
                    }
                }
            },
            {
                stripTrailingSlashes: false
            }
        );
    };

    module.exports = tagFactory;
})();
