;(function(){
    'use strict';
    var tagFactory = function($resource){
        return $resource(
            process.env.API_BASE_URL + 'api/tags/tags/',
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
