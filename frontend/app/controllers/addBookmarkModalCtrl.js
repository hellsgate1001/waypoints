;(function(){
    'use strict';
    var addBookmarkModalCtrl = function($scope, $uibModalInstance, $http, $rootScope, Bookmark, auth){
        var currentTags
            , authToken = auth.getToken();

        $scope.showLoad = false;
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
            user: auth.parseJwt(authToken).user_id,
            url: '',
            title: '',
            comment: '',
            tags: ''
        }
        $scope.filterTags = filterTags;
        $scope.tagSelected = tagSelected;
        $scope.getTitle = getTitle;

        function getTitle($event) {
            var titleElement;

            // Show the loading spinner
            $scope.showLoad = true;
            // Grab the title of the page from a given URL
            $http({
                method: 'GET',
                url: process.env.API_BASE_URL + 'api/bookmarks/get-title/',
                params: {url: $event.target.value}
            }).then(function success(response){
                $scope.fields.title = response.data.title;
                $scope.showLoad = false;
            }, function error(response){
                $scope.showLoad = false;
                console.log('Error:', response);
            });
        }

        function tagSelected($item, $model, $label, $event) {
            var tagsArray = currentTags.replace(', ', ',').split(',')
                , last;
            // Remove the last item
            last = tagsArray.pop();
            // Add the selected value to the array
            tagsArray.push($item);
            currentTags = tagsArray.join(', ');
            $scope.fields.tags = currentTags;
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
