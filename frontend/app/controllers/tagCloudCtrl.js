;(function(){
    'use strict';
    var tagCloudCtrl = function($scope, $timeout, $rootScope, Tag) {
        $scope.tags = [];
        $scope.tagFilter = '';
        $scope.setBookmarkTagFilter = setBookmarkTagFilter;
        $scope.tagPageInfo = {};
        $scope.loadTags = loadTags;
        $scope.tagsLoaded = false;
        $scope.clearFilter = clearFilter;

        $rootScope.bookmarkTagFilter = '';
        $rootScope.bookmarkCriteriaMatch = bookmarkCriteriaMatch;
        $rootScope.tagNames = []

        activate();

        function activate() {
            $scope.loadTags();
        }

        function bookmarkCriteriaMatch() {
            return function(waypoint){
                var filterResult = false
                    , validTag = false;

                waypoint.tags.forEach(function(tag){
                    if ($rootScope.bookmarkTagFilter === '' || tag.name === $rootScope.bookmarkTagFilter) {
                        validTag = true;
                    }
                });

                return validTag;
            }
        }

        function clearFilter() {
            $scope.tagFilter = '';
            setBookmarkTagFilter('')
        }

        function setBookmarkTagFilter(tagName) {
            var sidebar = angular.element(document.querySelector('#sidebar'));
            $rootScope.bookmarkTagFilter = tagName;
            // Hide the tag cloud again on mobile
            sidebar.removeClass('sidebar-show');
        }

        function loadTags() {
            $scope.tagPageInfo = Tag.query({}, function(){
                $scope.tags = $scope.tags.concat($scope.tagPageInfo);
                $scope.tagsLoaded = true;
                $scope.tagPageInfo.forEach(function(tagResult){
                    $rootScope.tagNames.push(tagResult.name);
                });
            });
        }
    };

    module.exports = tagCloudCtrl;
})();
