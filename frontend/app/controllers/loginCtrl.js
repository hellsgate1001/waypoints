;(function(){
    'use strict';
    var loginCtrl = function($scope, $resource, user, auth){
        $scope.loginFields = {};
        $scope.submitLogin = submitLogin;
        $scope.login = login;
        $scope.register = register;
        $scope.logout = logout;
        $scope.isAuthed = isAuthed;


        function submitLogin() {
            console.log('submit login');
        }

        function login() {
            console.log('Logging in');
            console.log($scope.loginFields);
            user.login($scope.loginFields.username, $scope.loginFields.password)
                .then(handleRequest);
        }

        function register() {
            user.register($scope.loginFields.username, $scope.loginFields.password)
                .then(handleRequest);
        }

        function logout() {
            auth.logout && auth.logout();
        }

        function isAuthed() {
            return auth.isAuthed ? auth.isAuthed() : false
        }

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if (token) {
                console.log('JWT:', token);
            }
            $scope.message = res.data.message;
        }
    };

    module.exports = loginCtrl;
})();
