;(function(){
    'use strict';
    var homeCtrl = function($cope, $http) {
        $scope.bookmarks = [];
        console.log('Its There!!!');

        $http(
            {
                url: 'http://192.168.2.141:8000/api/bookmarks/',
                method: 'get'
            }
        ).then(function success(response){
            $scope.bookmarks = response.data;
        }, function error(response){
            console.log('Failed');
            console.log(response);
        });
    };

    module.exports = homeCtrl;
})();
