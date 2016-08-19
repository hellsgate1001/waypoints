;(function(){
    'use strict';
    var homeCtrl = function($scope, $rootScope, $timeout, $document, $templateRequest, $sce, Bookmark, wpModal) {
        var tagInfo = [];

        $rootScope.offset = 30;

        $scope.apiBaseUrl = process.env.API_BASE_URL;
        $scope.tagCloudArray = [];
        $scope.tagCloud = {};
        $scope.formTemplate = '';
        $scope.offset = 0;
        $scope.perPage = 30;

        $scope.fields = {
            user: 1,
            url: '',
            title: '',
            comment: '',
            tags: ''
        }

        $scope.bookmarkPageInfo = {};
        $scope.waypoints = [];
        $scope.buildTags = buildTags;
        $scope.addBookmark = addBookmark;
        $scope.loadBookmarks = loadBookmarks;
        $scope.openTags = openTags;

        activate();

        function activate() {
            $scope.loadBookmarks();
        }

        function addBookmark() {
            var addBookmarkModalDefaults = {
                controller: 'AddBookmarkModalCtrl'
            };
            var tst = wpModal.showModal(addBookmarkModalDefaults);
            tst.then(function(response){
                var bookmarkData = {
                    title: response.title,
                    url: response.url,
                    comment: response.comment,
                    tags: response.tags
                };

                bookmarkAdded(bookmarkData);
                displaySuccessModal();
            }, function(){
                console.log('TST promise rejected:', arguments);
            }, function(){
                console.log('TST promise progress back:', arguments);
            });
        }

        function displaySuccessModal() {
            var addBookmarkSucessModalDefaults = {
                controller: 'AddBookmarkSuccessModalCtrl'
            };
            var successModal = wpModal.showModal(addBookmarkSucessModalDefaults);
        }

        function openTags($event) {
            var sidebar = angular.element(document.querySelector('#sidebar'));
            sidebar.addClass('sidebar-show');
        }

        function buildTags(tags) {
            var tagLinks = [];
            if (tags) {
                tags.forEach(function(tag){
                    tagLinks.push(
                        tag.name
                    );
                });
            }
            return tagLinks.join(',');
        }

        function bookmarkAdded(newBookmark) {
            $scope.waypoints.unshift(newBookmark);
        }

        function loadBookmarks() {
            $scope.bookmarkPageInfo = Bookmark.query({offset: $scope.offset}, function(){
                $scope.waypoints = $scope.waypoints.concat($scope.bookmarkPageInfo.results);
                if ($scope.bookmarkPageInfo.next !== null) {
                    $scope.offset += $scope.perPage;
                    $timeout($scope.loadBookmarks, 500);
                }
            });
        }

    };

    module.exports = homeCtrl;
})();
