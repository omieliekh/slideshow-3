angular.module('app').controller('galleryModalCtrl', [
    '$scope',
    '$uibModalInstance',
    'Upload',
    'appService',
    'galleryModalService',
function (
    $scope,
    $uibModalInstance,
    Upload,
    appService,
    service
) {

    $scope.selectedFilename = null;

    var initialize = function () {
        $scope.filter = service.getImageFilter();
        $scope.imagesPath = service.getConfig('imagesPath');
        getImagesList();

        console.log('$scope.filter: ', $scope.filter);
    };

    var getImagesList = function () {
        service.getUploadedImagesList().then(function (files) {
            $scope.files = files;
        });
    };

    $scope.setImageFilter = function (imageFilter) {
        $scope.filter = service.setImageFilter(imageFilter);
    };

    $scope.isGalleryItemVisible = function (item) {
        return (
            $scope.filter == 'all' ||
            ($scope.filter == 'today' && item.isToday) ||
            ($scope.filter == 'yesterday' && item.isYesterday)
        );
    };

    $scope.uploadFiles = function(file, errFiles, slide) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: appService.getConfig('uploadImagesPath'),
                data: {file: file}
            });

            file.upload.then(function (response) {
                file.result = response.data;

                if (response.data.filename){
                    //slide.image = response.data.filename;

                    getImagesList();
                }
            }, function (response) {
                //console.warn('');
            });
        }
    };

    $scope.selectFile = function(filename){
        $scope.selectedFilename = filename;
    };

    $scope.choose = function () {
        $uibModalInstance.close($scope.selectedFilename);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    initialize();
}]);