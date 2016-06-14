angular.module('app').config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
function (
    $locationProvider,
    $stateProvider,
    $urlRouterProvider
) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

}])

.constant("appConfig", {
    uploadedImagesPath: '/images/uploaded/'
});