angular.module('slideshowList', [
    'ngFileUpload'
]).controller('slideshowListController', [
    '$scope',
    '$stateParams',
    'appService',
    'slideshowListService',
function (
    $scope,
    $stateParams,
    appService,
    service
) {
    var initialize = function () {
        $scope.stateParams = $stateParams;
        $scope.isView = $stateParams.mode == 'view';
        $scope.isEdit = $stateParams.mode == 'edit';
        $scope.uploadedImagesPath = appService.getUploadedImagesPath();
        getList();
    };

    var getList = function () {
        service.getList().then(function (slideList) {
            $scope.slideList = slideList;
        }, function () {
            alert('Error while fetching slides list');
        });
    };

    initialize();

}]);