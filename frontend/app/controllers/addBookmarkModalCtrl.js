;(function(){
    'use strict';
    var addBookmarkModalCtrl = function($scope, $uibModalInstance, Bookmark){
        $scope.modalOptions = {
            title: 'Add Bookmark',
            heading: 'Add a new bookmark',
            message: 'Test Message',
            messageTemplate: 'templates/includes/addBookmarkForm.html',
            buttonSet: 'cancel',
            dismiss: dismiss,
            ok: ok
        };
        $scope.submitAddBookmark = submitAddBookmark;
        $scope.fields = {
            user: 1,
            url: '',
            title: '',
            comment: '',
            tags: ''
        }

        function dismiss(result) {
            console.log('bespoke dismiss function');
            $uibModalInstance.dismiss();
        }

        function ok(result){
            $uibModalInstance.close(true);
        }

        function submitAddBookmark(formValid) {
            console.log('submit it:', formValid);
            if (formValid === true) {
                Bookmark.save($scope.fields, success, error);
            }

            function error(error) {
                console.log('Error:', error);
            }

            function success(response) {
                console.log('Success:', response);
            }
        }
    };

    module.exports = addBookmarkModalCtrl;
})();
