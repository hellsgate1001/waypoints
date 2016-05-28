;(function(){
    'use strict';
    var loginCtrl = function($scope, $resource){
        $scope.loginFields = {};
        $scope.submitLogin = submitLogin;

        function submitLogin() {
            console.log('submit login');
        }
    };

    module.exports = loginCtrl;
})();
