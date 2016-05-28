;(function(){
    'use strict';
    var authService = function($window){
        var self = this;
        self.parseJwt = parseJwt;
        self.saveToken = saveToken;
        self.getToken = getToken;
        self.isAuthed = isAuthed;
        self.logout = logout;

        function logout() {
            $window.localStorage.removeItem('jwtToken');
        }

        function isAuthed() {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date.getTime() / 1000) <= params.exp;
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

        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var result = JSON.parse($window.atob(base64));
            console.log('base64', result);
        }
    };

    module.exports = authService;
})();
