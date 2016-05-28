;(function(){
    'use strict';
    var authInterceptorFactory = function(auth) {
        return {
            // automatically attach Authorization header
            request: function(config) {
                return config;
            },

            // If a token was sent back, save it
            response: function(res) {
                return res;
            }
        }
    };

    module.exports = authInterceptorFactory;
})();
