;(function(){
    'use strict';
    var authInterceptorFactory = function($injector, auth) {
        return {
            // automatically attach Authorization header
            request: function(config) {
                var token = auth.getToken();
                if (config.url.indexOf('http://127.0.0.1:8010/') === 0 && token) {
                    config.headers.Authorization = 'JWT ' + token;
                }
                // if (token) {
                //     auth.refreshToken(token);
                // }
                return config;
            },

            // If a token was sent back, save it
            response: function(res) {
                if (res.config.url.indexOf('http://127.0.0.1:8010/') === 0 && res.data.token) {
                    auth.saveToken(res.data.token);
                }
                return res;
            },

            // If the token is missing, redirect to login page
            responseError: function(res) {
                if (res.status === 401) {
                    $injector.get('$state').go('login');
                }
            }
        }
    };

    module.exports = authInterceptorFactory;
})();
