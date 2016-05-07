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
