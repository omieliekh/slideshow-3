angular.module('slideshowEdit', []).controller('slideshowEditController', [
    '$scope',
    '$stateParams',
    'appService',
    'slideshowEditService',
function (
    $scope,
    $stateParams,
    appService,
    service
) {
    $scope.stateParams = $stateParams;
    $scope.activeImageIdx = 0;

    var initialize = function () {
        $scope.uploadedImagesPath = appService.getUploadedImagesPath();
        getSlideList();
    };

    var getSlideList = function () {
        service.getSlideList($stateParams.slideId).then(function (slideList) {
            $scope.slideList = slideList;

        });
    };

    $scope.save = function () {
        service.save($stateParams.slideId, $scope.slideList);
    };

    $scope.addSlide = function (prevSlideIdx) {
        var item = service.getDefSlideItem();

        $scope.slideList.splice(prevSlideIdx + 1, 0, item);
    };

    $scope.removeSlide = function (slideIdx) {
        $scope.slideList.splice(slideIdx, 1);
    };



    initialize();

}]);