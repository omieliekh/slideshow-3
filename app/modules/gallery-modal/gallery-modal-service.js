angular.module('app')

.constant("galleryModalConfig", {
    apiPath: '/images/upload',
    imagesPath: '/images/uploaded/'
})

.service('galleryModalService', [
    '$q',
    '$http',
    '$parse',
    '$interpolate',
    'galleryModalConfig',
function (
    $q,
    $http,
    $parse,
    $interpolate,
    config
) {
    this.getConfig = function (path) {
        return angular.deepClone( $parse(path)(config) );
    };

    this.getPath = function (slideId) {
        return $interpolate( this.getConfig('slideItems') )({
            slideId: slideId
        });
    };

    this.getUploadedImagesList = function () {
        return $http.get( this.getConfig('apiPath') ).then(function (res) {
            if (res.data && angular.isArray(res.data)){
                return res.data;
            }
        });
    };
}]);