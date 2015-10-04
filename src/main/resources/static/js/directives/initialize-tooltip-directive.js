app.directive("initializeTooltip", ["$timeout", function($timeout) {
  return {
    link: function(scope) {

      if (scope.$last){
        $timeout(function() {
           angular.element('[data-toggle="tooltip"]').tooltip();
        }, 300);

      }

    }
  };
}]);
