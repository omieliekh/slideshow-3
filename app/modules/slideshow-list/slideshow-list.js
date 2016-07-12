angular.module('slideshowList', [
    'ngFileUpload'
]).controller('slideshowListController', [
    '$scope',
    '$timeout',
    '$uibModal',
    'appService',
    'slideshowListService',
function (
    $scope,
    $timeout,
    $uibModal,
    appService,
    service
) {
    var initialize = function () {
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