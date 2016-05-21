;(function(){
    'use strict';
    var tagFactory = function($resource){
        return $resource(process.env.API_BASE_URL + 'api/tags/tags/', null, {
            query: {
                isArray: false,
                transformResponse: function(data){
                    return JSON.parse(data);
                }
            }
        });
    };

    module.exports = tagFactory;
})();
