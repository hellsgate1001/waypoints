;(function(){
    'use strict';
    var homeCtrl = function($scope, $http, modalService) {
        var tagInfo = [];

        $scope.apiBaseUrl = process.env.API_BASE_URL;
        $scope.t1 = modalService.testOne;
        $scope.t2 = modalService.testTwo;
        $scope.tagCloudArray = [];
        $scope.tagCloud = {};

        $scope.fields = {
            user: '',
            url: '',
            title: '',
            comment: '',
            tags: ''
        }

        $scope.waypoints = [];

        $scope.buildTags = function(tags) {
            var tagLinks = [];
            tags.forEach(function(tag){
                tagLinks.push(
                    tag.name
                );
            });
            return tagLinks.join(',');
        };

        $scope.addBookmark = function(){
            var fields = {
                user: 1,
                url: 'http://www.crazy8golfers.co.uk',
                title: 'Crazy8Golfers',
                tags: 'music,metal,hobby,punk'
            };

            $http.post($scope.apiBaseUrl + 'api/bookmarks/bookmarks/', fields).then(function success(response){
                console.log('Success!!!');
                console.log(response);
            }, function error(response){
                console.log('Add Bookmark POST error.');
                console.log(response);
            });
        };

        $http.get($scope.apiBaseUrl + 'api/bookmarks/bookmarks/').then(function success(response){
            console.log('Get list success');
            console.log(response);
            $scope.waypoints = response.data;
        }, function error(response){
            console.log('Get list ERROR');
            console.log(response);
        });
        // $http({
        //     url: 'http://127.0.0.1:8000/api/bookmarks/',
        //     method: 'get'
        // }).then(function success(response){
        //     console.log(response);
        //     $scope.waypoints = response;
        // }, function error(response){
        //     console.log('Bookmarks API failed');
        //     console.log(response);
        // });

        $http.get($scope.apiBaseUrl + 'api/tags/tags/').then(function success(response){
            console.log(response);
            response.data.forEach(function(item){
                $scope.tagCloudArray.push({
                    text: item.name,
                    weight: item.size
                });
            });
            $scope.tagCloud = JSON.stringify($scope.tagCloudArray);
        }, function error(response){
            console.log('error');
        });
    };

    module.exports = homeCtrl;
})();
