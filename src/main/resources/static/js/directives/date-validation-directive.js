
app.directive("dateValidation", [function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {

        var dateExists = function(inputDate) {
            var dateArray = inputDate.split("/");
            var dateStandard = dateArray[2]+ "/"+ dateArray[1]+ "/" + dateArray[0];
            var date = new Date(dateStandard);

            return inputDate.length == 0 || date.getDate()==dateArray[0] && (date.getMonth()+1)==dateArray[1] && date.getFullYear()==dateArray[2];
        }

        var dateValidator = function(inputDate) {
            if (dateExists(inputDate)) {
                return true;
            } else {
                return false;
            }
        };

        element.on("blur", function() {
           var isDateValid = dateValidator(element.val());
           ngModel.$setValidity("dateValidation", isDateValid);
           scope.$apply();
        });
    },
  }
}]);