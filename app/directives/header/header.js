angular.module('app')

.directive('header', [
    '$rootScope',
    '$location',
function(
    $rootScope,
    $location
) {
    var links = [
        { href: '/slideshow-list', title: 'List' },
        { href: '/slideshow-edit/5', title: 'slideshow-edit/5' }
    ];

    return {
        restrict: 'E',
        templateUrl: 'app/directives/header/header.html',
        scope: {

        },
        controller: function($scope, $element, $attrs) {
            $scope.links = links;

            var checkUrl = function () {
                $scope.url = $location.url();
                $scope.$applyAsync();
            };

            $rootScope.$on('$locationChangeSuccess', checkUrl);

            checkUrl();
        }
    };
}]);