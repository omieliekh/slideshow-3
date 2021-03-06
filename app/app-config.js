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
    uploadImagesPath: '/images/upload',
    uploadedImagesPath: '/images/uploaded/'
});