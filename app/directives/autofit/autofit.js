angular.module('app')

.directive('autofit', [
    '$window',
    '$timeout',
function(
    $window,
    $timeout
) {
    return {
        restrict: 'A',
        scope: {},
        link: function(scope, element, attrs) {
            var jWindow = $($window),
                imageText;

            var initialize = function () {
                jWindow.on('resize', onWindowResize);
                $timeout(onWindowResize, 0);
            };

            var onWindowResize = function () {
                var
                    height = jWindow.height(),
                    width = jWindow.width(),
                    fontSize;

                if (!imageText || !imageText.length){
                    imageText = element.find('.image-text')
                }

                console.log('imageText: ', imageText);

                // we don't want to increase font size for wide screens,
                // that's why we have different formulas for different screen orientations
                if (width > height){
                    fontSize = parseInt(height/7);
                } else {
                    fontSize = parseInt( (height + width)/2/7 );
                }

                element.height(height - 40);
                imageText.css('font-size', fontSize);
            };

            scope.$on("$destroy", function() {
                jWindow.off('resize', onWindowResize);
            });

            initialize();
        }
    };
}]);