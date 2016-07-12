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

        return $http.get(path).then(function (res) {
            return res.data;
        });
    };


}]);