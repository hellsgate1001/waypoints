;(function(){
    'use strict';
    var addBookmarkModalCtrl = function($scope, $uibModalInstance, $rootScope, Bookmark){
        var currentTags;

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
        $scope.filterTags = filterTags;
        $scope.tagSelected = tagSelected;

        function tagSelected($item, $model, $label, $event) {
            var tagsArray = currentTags.replace(', ', ',').split(',')
                , last;
            // Remove the last item
            last = tagsArray.pop();
            // Add the selected value to the array
            tagsArray.push($item);
            currentTags = tagsArray.join(', ');
            $scope.fields.tags = currentTags;
            // console.log($scope.fields.tags);
            // console.log('item:', $item);
            // console.log('model:', $model);
            // console.log('label:', $label);
            // console.log('event:', $event);
            // console.log(currentTags);
        }

        function filterTags(inputValue) {
            var tags = inputValue.split(',')
                , lastTag;

            currentTags = inputValue;
            lastTag = tags.pop().trim();
            return lastTag;
        }

        function dismiss(result) {
            console.log('bespoke dismiss function');
            $uibModalInstance.dismiss();
        }

        function ok(result){
            $uibModalInstance.close(true);
        }

        function submitAddBookmark(formValid) {
            if (formValid === true) {
                Bookmark.save($scope.fields, success, error);
            }

            function error(error) {
                console.log('Error:', error);
            }

            function success(response) {
                $uibModalInstance.close(response);
            }
        }
    };

    module.exports = addBookmarkModalCtrl;
})();
