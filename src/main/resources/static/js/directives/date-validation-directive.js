
app.directive("dateValidation", [function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {

        var dateValidator = function(inputDate) {
            console.log(inputDate);
            var dateArray = inputDate.split("/");
            var dateStandard = dateArray[2]+ "/"+ dateArray[1]+ "/" + dateArray[0];
            var date = new Date(dateStandard);

            if (inputDate.length == 0 || date.getDate()==dateArray[0] && (date.getMonth()+1)==dateArray[1] && date.getFullYear()==dateArray[2]) {
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