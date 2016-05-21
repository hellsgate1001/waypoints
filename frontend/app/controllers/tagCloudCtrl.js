;(function(){
    'use strict';
    var tagCloudCtrl = function($scope, Tag) {
        $scope.tags = Tag.query();
        $scope.tagFilter = '';
    };

    module.exports = tagCloudCtrl;
})();
