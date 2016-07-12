angular.module('slideshowEdit').service('slideshowEditService', [
    '$q',
    '$http',
    '$parse',
    '$interpolate',
    'slideshowEditConfig',
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

    this.getDefSlideItem = function () {
        var result = this.getConfig('defaultSlideItem');

        console.log('items equal: ', result == config.defaultSlideItem);

        return result;
    };

    this.getPath = function (slideId) {
        return $interpolate( this.getConfig('slideItems') )({
            slideId: slideId
        });
    };

    this.getSlideList = function (slideId) {
        var path = this.getPath(slideId);

        return $http.get(path).then(function (res) {
            return res.data;
        });
    };
    
    this.save = function (slideId, slideList) {
        var path = this.getPath(slideId);

        return $http.put(path, slideList);
    }


}]);