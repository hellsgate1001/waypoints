;(function(){
    'use strict';
    var bookmarkFactory = function($resource){
        return $resource(
            'http://127.0.0.1:8010/api/bookmarks/bookmarks/',
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
