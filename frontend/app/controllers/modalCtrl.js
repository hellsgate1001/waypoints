;(function(){
    'use strict';
    var modalCtrl = function($scope, $uibModalInstance, messageParts){
        $scope.modalTitle = messageParts.title;
        $scope.modalHeading = messageParts.heading;
        $scope.message = messageParts.message;
        $scope.messageTemplate = messageParts.messageTemplate;
        $scope.valid = messageParts.valid;
        $scope.buttonSet = messageParts.buttonSet;

        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.dismiss = dismiss;

        // if ($scope.messageTemplate !== '') {
        //     var tUrl = $sce.getTrustedResourceUrl('templates/includes/addBookmarkForm.html');
        //     $templateRequest(tUrl).then(function(template){
        //         $scope.formTemplate = template;
        //         return $scope.formTemplate;
        //     });
        // }

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
    };

    module.exports = modalCtrl;
})();
