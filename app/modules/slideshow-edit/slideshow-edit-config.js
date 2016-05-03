angular.module('slideshow')

.config([
    '$locationProvider',
    '$stateProvider',
function (
    $locationProvider,
    $stateProvider
) {
    $stateProvider.state('slideshow', {
        url: "/slideshow/:slideId",
        controller: 'slideshowController',
        templateUrl: "app/modules/slideshow/slideshow.html"
    });

}])

.constant("slideshowConfig", {
    pathGetItems: '/api/slideshow/{{slideId}}'
});