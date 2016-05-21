;(function(){
    'use strict';
    var tagCloudCtrl = function($scope, Tag) {
        $scope.tags = Tag.query();
    };

    module.exports = tagCloudCtrl;
})();
