;(function(){
    'use strict';
    var homeCtrl = function($scope, $http, $uibModal, $document, $templateRequest, $sce) {
        var tagInfo = [];

        $scope.apiBaseUrl = process.env.API_BASE_URL;
        $scope.tagCloudArray = [];
        $scope.tagCloud = {};
        $scope.formTemplate = '';
        // $scope.getFormTemplate = getFormTemplate;

        $scope.fields = {
            user: 1,
            url: '',
            title: '',
            comment: '',
            tags: ''
        }

        $scope.waypoints = [];
        $scope.buildTags = buildTags;
        $scope.addBookmark = addBookmark;

        activate();

        function activate() {
            $http.get($scope.apiBaseUrl + 'api/bookmarks/bookmarks/').then(function success(response){
                console.log(response);
                $scope.waypoints = response.data;
            }, function error(response){
                console.log('Get list ERROR');
            });

            $http.get($scope.apiBaseUrl + 'api/tags/tags/').then(function success(response){
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
        }

        function buildTags(tags) {
            var tagLinks = [];
            tags.forEach(function(tag){
                tagLinks.push(
                    tag.name
                );
            });
            return tagLinks.join(',');
        }

        function addBookmark(){
            // make sure the modal container dive is 100% height
            $uibModal.open({
                // appendTo: angular.element(document.querySelector('#modal-container')),
                animation: false,
                backdropClass: 'my-class',
                templateUrl: 'templates/modal.html',
                controller: 'ModalCtrl',
                resolve: {
                    messageParts: {
                        title: 'Add Bookmark',
                        heading: 'Add a new bookmark',
                        message: 'Test Message',
                        messageTemplate: 'templates/includes/addBookmarkForm.html',
                        valid: true,
                        buttonSet: 'submitCancel'
                    }
                }
            }).result.then(function close(k){
                console.log('closed: ' + k);
            });
            // var fields = {
            //     user: 1,
            //     url: 'http://www.crazy8golfers.co.uk',
            //     title: 'Crazy8Golfers',
            //     tags: 'music,metal,hobby,punk'
            // };

            // $http.post($scope.apiBaseUrl + 'api/bookmarks/bookmarks/', fields).then(function success(response){
            //     console.log('Success!!!');
            //     console.log(response);
            // }, function error(response){
            //     console.log('Add Bookmark POST error.');
            //     console.log(response);
            // });
        }

    };

    module.exports = homeCtrl;
})();
