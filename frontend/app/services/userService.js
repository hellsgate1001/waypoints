;(function(){
    'use strict';
    var userService = function($http, auth){
        var self = this;
        self.login = login;

        function login(username, password) {
            return $http.post(process.env.API_BASE_URL + 'api-token-auth/', {
                username: username,
                password: password
            });
        }
    };

    module.exports = userService;
})();
