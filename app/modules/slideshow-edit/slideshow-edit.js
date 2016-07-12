angular.module('slideshowEdit', [
    'ngFileUpload'
]).controller('slideshowEditController', [
    '$scope',
    '$timeout',
    '$uibModal',
    '$stateParams',
    'appService',
    'slideshowEditService',
function (
    $scope,
    $timeout,
    $uibModal,
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
        }, function () {
            alert('Error while fetching slides list');
        });
    };

    $scope.save = function () {
        service.save($stateParams.slideId, $scope.slideList);
    };

    $scope.addSlide = function (idx) {
        var item = service.getDefSlideItem();

        $scope.slideList.slides.splice(idx, 0, item);

        focusElement(idx + 1);
    };

    var focusElement = function (elemNum) {
        $timeout(function () {
            angular.element('.image-item:nth-child('+elemNum+') input').focus();
        });
    };

    $scope.removeSlide = function (slideIdx) {
        $scope.slideList.slides.splice(slideIdx, 1);
    };

    $scope.openGallery = function (slide) {
        $uibModal.open({
            animation: true,
            templateUrl: 'app/modules/gallery-modal/gallery-modal.html',
            controller: 'galleryModalCtrl',
            size: 'lg'
        }).result.then(function (filename) {
            slide.image = filename;
        });
    };

    initialize();

}]);