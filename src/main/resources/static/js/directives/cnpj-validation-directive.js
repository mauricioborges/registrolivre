app.directive("cnpjValidation", ["companies", "clipboard", function(companies, clipboard) {
  return {
    scope: {},
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      ngModel.$setValidity("validandoCNPJ", false);

      scope.showUniqueCnpjMessage = function(){
        return scope.cnpjAlreadyExists && element.hasClass("has-error");
      }

      scope.showIncompleteCnpjMessage = function(){
        return scope.incompleteCnpj && element.hasClass("has-error");
      }

      scope.showInvalidCnpjMessage = function(){
        return scope.invalidCnpj && element.hasClass("has-error");
      }

      element.on("blur", function() {
        scope.cnpjAlreadyExists = false;
        scope.incompleteCnpj = false;
        scope.invalidCnpj = false;
        ngModel.$setValidity("validandoCNPJ", false);
        validateCNPJ(element.val());
        scope.$apply();
      });

      element.on("paste", clipboard.handlePaste(element));

      var validateCNPJ = function(input) {
        var cnpj = input.replace(/[^\d]+/g, "");
        console.log(input);
        console.log(cnpj);
        return isCNPJStructureValid(cnpj) &&
          firstDigitValidation(cnpj) &&
          secondDigitValidation(cnpj) &&
          verifyUniqueCnpj(input);
      };

      var verifyUniqueCnpj = function(cnpj) {
        scope.verifingCnpj = true;

        companies.getCompanyByCnpj(cnpj).then(
            function(response) {
                scope.verifingCnpj = false;
                scope.cnpjAlreadyExists = true;
                ngModel.$setValidity("validandoCNPJ", false);
                console.log("oi");
            }, function(response) {
                scope.verifingCnpj = false;
                ngModel.$setValidity("validandoCNPJ", true);
                console.log("oi?");
            })
        return true;
      }

      var isCNPJStructureValid = function(cnpj) {
        if (cnpj.length != 14) {
          scope.incompleteCnpj = true;
          return false;
        }
        if (areAllCharsTheSame(cnpj)){
          scope.invalidCnpj = true;
          return false;
        }
        return true;
      };

      var areAllCharsTheSame = function(input) {
        for (i = 0; i < input.length - 1; i++) {
          if (input.charAt(i) != input.charAt(i + 1)) {
            return false;
          }
        }
        return true;
      };

      var firstDigitValidation = function(cnpj) {
        var size = cnpj.length - 2;
        var digits = cnpj.substring(size);
        var valid = cnpjDigitCalculation(cnpj, size) == digits.charAt(0);
        scope.invalidCnpj = !valid;
        return valid;
      };

      var secondDigitValidation = function(cnpj) {
        var size = cnpj.length - 1;
        var digits = cnpj.substring(size);
        var valid = cnpjDigitCalculation(cnpj, size) == digits.charAt(0);
        scope.invalidCnpj = !valid;
        return valid;
      };

      var cnpjDigitCalculation = function(cnpj, size) {
        var numbers = cnpj.substring(0, size);
        var sum = 0;
        var pos = size - 7;
        for (i = size; i >= 1; i--) {
          sum += numbers.charAt(size - i) * pos--;
          if (pos < 2)
            pos = 9;
        }
        return sum % 11 < 2 ? 0 : 11 - sum % 11;
      };
    },
  }

}]);
