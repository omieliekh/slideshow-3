angular.module('slideshow', []).controller('slideshowController', [
    '$scope',
    '$stateParams',
    'slideshowService',
function (
    $scope,
    $stateParams,
    slideshowService
) {
    console.log('$stateParams: ', $stateParams);
    
    $scope.stateParams = $stateParams;
    $scope.activeImageIdx = 0;

    var initialize = function () {
        getSlideList();
    };

    var getSlideList = function () {
        slideshowService.getSlideList($stateParams.slideId).then(function (slideList) {
            $scope.slideList = slideList;

        });
    };

    $scope.nextImage = function () {
        if ($scope.activeImageIdx + 1 <= $scope.slideList.length - 1){
            $scope.activeImageIdx++;
        }

        console.log('$scope.activeImageIdx: ', $scope.activeImageIdx);
    };

    $scope.prevImage = function () {
        if ($scope.activeImageIdx - 1 >= 0){
            $scope.activeImageIdx--;
        }

        console.log('$scope.activeImageIdx: ', $scope.activeImageIdx);
    };

    initialize();

}]);