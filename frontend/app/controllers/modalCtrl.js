;(function(){
    'use strict';
    var modalCtrl = function($scope, $uibModalInstance, $http, messageParts){
        $scope.modalTitle = messageParts.title;
        $scope.modalHeading = messageParts.heading;
        $scope.message = messageParts.message;
        $scope.messageTemplate = messageParts.messageTemplate;
        $scope.valid = messageParts.valid;
        $scope.buttonSet = messageParts.buttonSet;
        $scope.fields = {};
        $scope.apiBaseUrl = process.env.API_BASE_URL;

        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.dismiss = dismiss;
        $scope.submit = submit;

        // Functions
        function ok() {
            $uibModalInstance.close(true);
        }

        function cancel() {
            $uibModalInstance.close(false);
        }

        function dismiss() {
            $uibModalInstance.dismiss();
        }

        function submit() {
            console.log('Submitted');
            console.log($scope.fields);

            $http.post(
                $scope.apiBaseUrl + 'api/bookmarks/bookmarks/',
                $scope.fields
            ).then(function success(response){
                console.log('Success');
                $scope.ok();
            }, function error(response){
                console.log('Error');
            });
        }
    };

    module.exports = modalCtrl;
})();
