angular.module('slideshowList')

.config([
    '$locationProvider',
    '$stateProvider',
    function (
        $locationProvider,
        $stateProvider
    ) {
        $stateProvider.state('slideshowList', {
            url: "/slideshow-list",
            controller: 'slideshowListController',
            templateUrl: "app/modules/slideshow-list/slideshow-list.html"
        });

    }])

.constant("slideshowListConfig", {
    slideshowList: '/api/slideshow-list'
});