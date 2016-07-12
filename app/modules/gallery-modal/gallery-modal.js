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
        $scope.imagesPath = service.getConfig('imagesPath');
        getImagesList();
    };

    var getImagesList = function () {
        service.getUploadedImagesList().then(function (files) {
            $scope.files = files;
        });
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