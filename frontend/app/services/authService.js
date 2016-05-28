;(function(){
    'use strict';
    var authService = function($window, $injector){
        var self = this;
        self.parseJwt = parseJwt;
        self.saveToken = saveToken;
        self.getToken = getToken;
        self.refreshToken = refreshToken;
        self.isAuthed = isAuthed;
        self.logout = logout;

        function logout() {
            $window.localStorage.removeItem('jwtToken');
        }

        function isAuthed() {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        function getToken() {
            return $window.localStorage['jwtToken'];
        }

        function saveToken(token) {
            $window.localStorage['jwtToken'] = token;
        }

        function refreshToken(token) {
            if (token) {
                var params = self.parseJwt(token);
                if (params.exp - Math.round(new Date().getTime() / 1000) < 90) {
                    console.log('refresh the token');
                    // refresh the token
                    // return $injector.get('$http').post(process.env.API_BASE_URL + 'api-token-refresh/', {
                    //     token: token
                    // });
                }
            }
        }

        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }
    };

    module.exports = authService;
})();
