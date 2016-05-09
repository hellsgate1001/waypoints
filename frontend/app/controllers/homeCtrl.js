;(function(){
    'use strict';
    var homeCtrl = function($scope, $http, $uibModal, $document, $templateRequest, $sce) {
        var tagInfo = [];

        $scope.apiBaseUrl = process.env.API_BASE_URL;
        $scope.tagCloudArray = [];
        $scope.tagCloud = {};
        $scope.formTemplate = '';

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
            $uibModal.open({
                animation: false,
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
            }).result.then(function close(result){
                if (result === true) {
                    // Success, show a message which can be closed
                    $uibModal.open({
                        animation: false,
                        templateUrl: 'templates/modal.html',
                        controller: 'ModalCtrl',
                        resolve: {
                            messageParts: {
                                title: 'Bookmark Added',
                                heading: 'Successfully added bookmark & tags',
                                message: 'Your bookmark and tags have been added',
                                buttonSet: 'ok'
                            }
                        }
                    }).result.then(function close(){}, function dismiss(){
                        console.log('New updated thing dismissed');
                    });
                } else {
                    // some problem with the post
                }
            }, function dismiss(){

            });
        }

    };

    module.exports = homeCtrl;
})();
