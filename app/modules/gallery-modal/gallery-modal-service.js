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
    var
        imageFilters = ['all', 'today', 'yesterday'],
        imageFilter = imageFilters[0];

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

    this.getImageFilter = function () {
        return imageFilter;
    };

    this.setImageFilter = function (newImageFilter) {
        newImageFilter = (imageFilters.indexOf(newImageFilter) != -1) ? newImageFilter : imageFilters[0];

        imageFilter = newImageFilter;

        return imageFilter;
    };

}]);