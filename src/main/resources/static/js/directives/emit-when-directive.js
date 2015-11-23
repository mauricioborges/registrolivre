app.directive('emitWhen', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var params = scope.$eval(attrs.emitWhen);
            scope.$emit(params.event);
        }
    };
});