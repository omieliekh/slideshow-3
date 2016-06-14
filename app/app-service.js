angular.module('app').service('appService', [
    '$parse',
    'appConfig',
function (
    $parse,
    config
) {
    this.getConfig = function (path) {
        return angular.deepClone( $parse(path)(config) );
    };

    this.getUploadedImagesPath = function () {
        return this.getConfig('uploadedImagesPath');
    };


}]);