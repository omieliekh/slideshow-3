angular.module('slideshowList').service('slideshowListService', [
    '$q',
    '$http',
    '$parse',
    '$interpolate',
    'slideshowListConfig',
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

    this.getList = function () {
        var path = this.getConfig('slideshowList');

        return $http.get(path).then(function (res) {
            return res.data;
        });
    };

}]);