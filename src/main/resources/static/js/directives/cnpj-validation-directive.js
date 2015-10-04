app.directive("cnpjValidation", ["companies", "clipboard", function(companies, clipboard) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      scope.showUniqueCnpjMessage = function(){
        return scope.cnpjAlreadyExists && element.hasClass("has-error");
      };

      scope.showIncompleteCnpjMessage = function(){
        return scope.incompleteCnpj && element.hasClass("has-error");
      };

      scope.showInvalidCnpjMessage = function(){
        return scope.invalidCnpj && element.hasClass("has-error");
      };

      var validateCNPJ = function(input) {
        var cnpj = input.replace(/[^\d]+/g, "");
        return isCNPJStructureValid(cnpj) &&
          firstDigitValidation(cnpj) &&
          secondDigitValidation(cnpj) &&
          verifyUniqueCnpj(input);
      };

      element.on("blur", function() {
        scope.$emit('verifyingCnpj');
        ngModel.$setValidity("validandoCNPJ", false);
        var isValid = validateCNPJ(element.val());

        if (isValid) {
          element.parent().removeClass('has-error');
          element.parent().addClass('has-success');
        } else {
          element.parent().removeClass('has-success');
          element.parent().addClass('has-error');
        }
        scope.$apply();
      });

      element.on("paste", clipboard.handlePaste(element));

      var verifyUniqueCnpj = function(cnpj) {
        scope.verifingCnpj = true;

        companies.getCompanyByCnpj(cnpj).then(
            function(response) {
                scope.verifingCnpj = false;
                scope.cnpjAlreadyExists = true;
                scope.$emit('duplicatedCnpj');
                ngModel.$setValidity("validandoCNPJ", false);
            }, function(response) {
                scope.verifingCnpj = false;
                scope.$emit('validCnpj');
                ngModel.$setValidity("validandoCNPJ", true);
            });
        return true;
      };

      var isCNPJStructureValid = function(cnpj) {
        if (cnpj.length != 14) {
          scope.incompleteCnpj = true;
          scope.$emit('incompleteCnpj');
          return false;
        }
        if (areAllCharsTheSame(cnpj)){
          scope.invalidCnpj = true;
          scope.$emit('invalidCnpj');
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
        return cnpjDigitValidation(cnpj, cnpj.length - 2);
      };

      var secondDigitValidation = function(cnpj) {
        return cnpjDigitValidation(cnpj, cnpj.length - 1);
      };

      var cnpjDigitValidation = function(cnpj, size) {
        var digits = cnpj.substring(size);
        var valid = cnpjDigitCalculation(cnpj, size) == digits.charAt(0);
        scope.invalidCnpj = !valid;
        if(!valid) {
          scope.$emit('invalidCnpj');
        }
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
  };

}]);
