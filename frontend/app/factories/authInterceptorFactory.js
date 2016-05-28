;(function(){
    'use strict';
    var authInterceptorFactory = function(auth) {
        return {
            // automatically attach Authorization header
            request: function(config) {
                var token = auth.getToken();
                if (config.url.indexOf(process.env.API_BASE_URL) === 0 && token) {
                    config.headers.Authorization = 'JWT ' + token;
                }
                return config;
            },

            // If a token was sent back, save it
            response: function(res) {
                if (res.config.url.indexOf(process.env.API_BASE_URL) === 0 && res.data.token) {
                    auth.saveToken(res.data.token);
                }
                return res;
            }
        }
    };

    module.exports = authInterceptorFactory;
})();
