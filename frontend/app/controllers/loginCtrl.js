;(function(){
    'use strict';
    var loginCtrl = function($scope, $state, user, auth){
        $scope.loginFields = {};
        $scope.login = login;
        $scope.register = register;
        $scope.logout = logout;
        $scope.isAuthed = isAuthed;

        function login() {
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
            $scope.message = res.data.message;
            $state.go('home');
        }
    };

    module.exports = loginCtrl;
})();
