angular.module('slideshow').service('slideshowService', [
    '$q',
    '$http',
    '$parse',
    '$interpolate',
    'slideshowConfig',
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

    this.getSlideList = function (slideId) {
        var path = $interpolate( this.getConfig('pathGetItems') )({
            slideId: slideId
        });

        console.log('path: ', path);

        return $http.get(path).then(function (res) {
            if (res.data && angular.isArray(res.data)){
                return res.data;
            }
        });
    };


}]);