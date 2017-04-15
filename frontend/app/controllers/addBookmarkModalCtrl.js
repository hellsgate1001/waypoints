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
        $scope.inputDims = {};
        $scope.filterTags = filterTags;
        $scope.tagSelected = tagSelected;
        $scope.getTitle = getTitle;

        function getTitle($event) {
            var titleElement = angular.element(document.querySelector('#title'));

            // Only grab the title when nothing has been entered in the title input yet
            if ($event.target.value !== '' && titleElement.val() === '') {
                // Show the loading spinner
                $scope.showLoad = true;

                // Grab the title of the page from a given URL
                $http({
                    method: 'GET',
                    url: process.env.API_BASE_URL + 'api/bookmarks/get-title/',
                    params: {url: $event.target.value}
                }).then(function success(response){
                    $scope.fields.title = decodeTitle(response.data.title);
                    $scope.showLoad = false;
                }, function error(response){
                    $scope.showLoad = false;
                    console.log('Error:', response);
                });
            }
        }

        function decodeTitle(title) {
            var txt = document.createElement('textarea');

            txt.innerHTML = title;
            return txt.value;
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
                , lastTag
                , tagInput = document.getElementById('tagInput');

            if (Object.keys($scope.inputDims).length === 0) {
                // Position the typeahead dropdown
                positionDropdown(tagInput);
            }

            currentTags = inputValue;
            lastTag = tags.pop().trim();
            return lastTag;
        }

        function positionDropdown(inputElement) {
            var elements = document.querySelectorAll('.dropdown-menu');

            $scope.inputDims = getInputDims(inputElement);

            angular.element(elements[0]).css({
                left: $scope.inputDims.left + 'px',
                top: ($scope.inputDims.top + $scope.inputDims.height + 3) + 'px'
            });
        }

        function getInputDims(inputElement) {
            var rect = inputElement.getBoundingClientRect();

            return {
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                width: Math.round(rect.right - rect.left),
                height: Math.round(rect.bottom - rect.top)
            };
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
