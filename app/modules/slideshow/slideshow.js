angular.module('slideshow', []).controller('slideshowController', [
    '$scope',
    '$stateParams',
    '$window',
    'appService',
    'slideshowService',
function (
    $scope,
    $stateParams,
    $window,
    appService,
    slideshowService
) {
    $scope.stateParams = $stateParams;
    $scope.activeImageIdx = 0;
    $scope.uploadedImagesPath = appService.getUploadedImagesPath();

    var initialize = function () {
        getSlideList();
    };

    var getSlideList = function () {
        slideshowService.getSlideList($stateParams.slideId).then(function (slideList) {
            $scope.slideList = slideList;

        });
    };

    $scope.jumpToImage = function (idx) {
        $scope.activeImageIdx = idx;
    };

    $scope.nextImage = function () {
        if ($scope.activeImageIdx + 1 <= $scope.slideList.slides.length - 1){
            $scope.activeImageIdx++;
        } else {
            $scope.activeImageIdx = 0;
        }
    };

    $scope.prevImage = function () {
        if ($scope.activeImageIdx - 1 >= 0){
            $scope.activeImageIdx--;
        } else if ($scope.slideList && $scope.slideList.slides) {
            $scope.activeImageIdx = $scope.slideList.slides.length - 1;
        }
    };

    initialize();

}]);