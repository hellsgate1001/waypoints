;(function(){
    'use strict';
    var addBookmarkSuccessModalCtrl = function($scope, $uibModalInstance) {
        $scope.modalOptions = {
            title: 'Add Bookmark',
            heading: 'Bokmark added successfully',
            message: 'Your bookmark has been addedsuccessfully',
            buttonSet: 'ok',
            ok: ok
        };

        function ok(result) {
            $uibModalInstance.close(true);
        }
    };

    module.exports = addBookmarkSuccessModalCtrl;
})();
