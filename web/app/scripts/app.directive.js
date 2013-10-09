angular.module('app.directive', [])
  .directive('selectOnClick', function () {
    // Linker function
    return function (scope, element, attrs) {
      element.click(function () {
        element.select();
      });
    };
  });