;(function(){
    'use strict';
    var bookmarkFactory = function($resource){
        return $resource(
            process.env.API_BASE_URL + 'api/bookmarks/bookmarks/',
            null,
            {
                query: {
                    isArray: false,
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

    module.exports = bookmarkFactory;
})();
