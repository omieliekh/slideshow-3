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

    this.getDefSlideshowItem = function () {
        return this.getConfig('defaultSlideshowItem');
    };

    this.getDefSlideItem = function () {
        return this.getConfig('defaultSlideItem');
    };

    this.getPath = function (slideId) {
        return $interpolate( this.getConfig('slideItems') )({
            slideId: slideId
        });
    };

    this.getSlideList = function (slideId) {
        var
            defer = $q.defer(),
            path = this.getPath(slideId);

        if (!slideId){
            defer.resolve( this.getDefSlideshowItem() );
            return defer.promise;
        }

        return $http.get(path).then(function (res) {
            return res.data;
        });
    };
    
    this.save = function (slideId, slideList) {
        var path = this.getPath(slideId);

        return $http[slideId ? 'put' : 'post'](path, slideList).then(function (res) {
            return res.data;
        });
    }


}]);