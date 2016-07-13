angular.module('slideshowEdit')

.config([
    '$locationProvider',
    '$stateProvider',
function (
    $locationProvider,
    $stateProvider
) {
    $stateProvider.state('slideshowEdit', {
        url: "/slideshow-edit/:slideId",
        controller: 'slideshowEditController',
        templateUrl: "app/modules/slideshow-edit/slideshow-edit.html"
    });

}])

.constant("slideshowEditConfig", {
    slideItems: '/api/slideshow/{{slideId}}',

    defaultSlideshowItem: {
        "title": "Slideshow title",
        "slides": []
    },

    defaultSlideItem: {
        "image": "", // image name
        "text": "",
        "text-position": "bottom" // "top" | "bottom"
    }
});