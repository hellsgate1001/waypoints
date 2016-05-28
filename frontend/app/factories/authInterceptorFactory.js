;(function(){
    'use strict';
    var authInterceptorFactory = function($injector, auth) {
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
            },

            // If the token is missing, redirect to login page
            responseError: function(res) {
                if (res.status === 401) {
                    $injector.get('$state').go('login');
                }
                console.log('Res:', res);
            }
        }
    };

    module.exports = authInterceptorFactory;
})();
