;(function(){
    'use strict';
    var tagCloudCtrl = function($scope, $timeout, $rootScope, Tag) {
        $scope.tags = [];
        $scope.tagFilter = '';
        $scope.setBookmarkTagFilter = setBookmarkTagFilter;
        $scope.tagPageInfo = {};
        $scope.offset = 0;
        $scope.perPage = 30;
        $scope.loadTags = loadTags;
        $scope.clearFilter = clearFilter;

        $rootScope.bookmarkTagFilter = '';

        activate();

        function activate() {
            $scope.loadTags();
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
            $scope.tagPageInfo = Tag.query({offset: $scope.offset}, function(){
                $scope.tags = $scope.tags.concat($scope.tagPageInfo.results);
                if ($scope.tagPageInfo.next !== null) {
                    $scope.offset += $scope.perPage;
                    // $timeout($scope.loadTags, 350);
                }
            });
        }
    };

    module.exports = tagCloudCtrl;
})();
