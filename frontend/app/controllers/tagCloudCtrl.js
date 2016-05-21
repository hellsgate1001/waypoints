;(function(){
    'use strict';
    var tagCloudCtrl = function($scope, $rootScope, Tag) {
        $scope.tags = Tag.query();
        $scope.tagFilter = '';
        $scope.setBookmarkTagFilter = setBookmarkTagFilter;

        $rootScope.bookmarkTagFilter = '';

        function setBookmarkTagFilter(tagName) {
            console.log(tagName);
            $rootScope.bookmarkTagFilter = tagName;
        }
    };

    module.exports = tagCloudCtrl;
})();
