;(function(){
    'use strict';
    var headerCtrl = function($scope, $state, auth){
        $scope.isAuthed = isAuthed;
        $scope.logout = logout;

        function isAuthed() {
            return auth.isAuthed ? auth.isAuthed() : false;
        }

        function logout() {
            auth.logout();
            $state.go('login');
        }
    };

    module.exports = headerCtrl;
})();
