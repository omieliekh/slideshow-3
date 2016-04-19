angular.module('testModule')

.config([
    '$locationProvider',
    '$stateProvider',
function (
    $locationProvider,
    $stateProvider
) {
    $stateProvider.state('testModule', {
        url: "/test-module",
        templateUrl: "app/modules/test-module/test-module.html"
    });

}])

.constant("testModuleConfig", {
    pathGetItems: '/some/server/path'
});