
app.controller("NewCompanyController", ["$scope", "$document", "companies", "messages", "statesAndCities", "fileUploaderFactory", function($scope, $document, companies, messages, statesAndCities, fileUploaderFactory) {
  fileUploaderFactory.setFileUploaderOptions($scope, $document);
  $scope.VALIDATION = {
    INVALID : 0,
    INCOMPLETE : 1,
    DUPLICATED : 2,
    LOADING : 3,
    VALID: 4
  };

  $scope.addPartner = function(){
    $scope.company = $scope.company || {};
    if($scope.company.partners === undefined){
      $scope.company.partners = [];
    }
    $scope.company.partners.push({name:"", isActive: true});
  };

  $scope.removePartner = function(position){
    if($scope.hasPartners()){
      $scope.company.partners.splice(position, 1);
    }
  };

  $scope.hasPartners = function(){
    return $scope.company !== undefined && Array.isArray($scope.company.partners) && $scope.company.partners.length > 0;
  };

  $scope.getStates = function() {
    return statesAndCities.getStates();
  };

  $scope.loadCities = function () {
    return $scope.company && statesAndCities.getCitiesByState($scope.company.state);
  };

  $scope.createCompany = function(company) {
    var file = $scope.evaData.files[0];
    if (!file) {
      messages.showDanger("Você deve carregar um arquivo antes de continuar.");
    }
    company.documents = [{
      url: file.url,
      issueDate: company.issueDate
    }];
    companies.newCompany(company).then(function() {
          messages.showSuccess("Empresa <strong>"+ company.tradeName +"</strong> foi cadastrada.");
          $scope.userForm.$setPristine();
          $scope.resetForm();
          if(document.getElementsByName('userForm') !== undefined && document.getElementsByName('userForm').length > 0){
            document.getElementsByName('userForm')[0].reset();
          }
          $scope.cnpjValidation = $scope.VALIDATION.VALID;
          $scope.verifyDate = $scope.VALIDATION.VALID;
        }, function() {
           messages.showDanger("Ocorreu um erro no sistema, por favor tente novamente.");
        });
    };

  $scope.resetForm = function() {
    $scope.company = {};
    $document.find(".has-feedback").removeClass("has-error has-success");
    $document.find("#btn-submit").attr("disabled", true);
    $scope.evaData.clearFiles();
  };

  $scope.$on('verifyingCnpj', function() {
    $scope.cnpjValidation = $scope.VALIDATION.LOADING;
  });

  $scope.$on('duplicatedCnpj', function() {
    $scope.cnpjValidation = $scope.VALIDATION.DUPLICATED;
  });

  $scope.$on('incompleteCnpj', function(){
    $scope.cnpjValidation = $scope.VALIDATION.INCOMPLETE;
  });

  $scope.$on('invalidCnpj', function() {
    $scope.cnpjValidation = $scope.VALIDATION.INVALID;
  });

  $scope.$on('validCnpj', function() {
      $scope.cnpjValidation = $scope.VALIDATION.VALID;
  });

  $scope.$on('issueDateValid', function() {
      $scope.issueDateValidation = $scope.VALIDATION.VALID;
  });

  $scope.$on('issueDateInvalid', function() {
      $scope.issueDateValidation = $scope.VALIDATION.INVALID;
  });

  $scope.$on('openingDateValid', function() {
      $scope.openingDateValidation = $scope.VALIDATION.VALID;
  });

  $scope.$on('openingDateInvalid', function() {
      $scope.openingDateValidation = $scope.VALIDATION.INVALID;
  });

  $scope.clearForm = function(form) {
    form.$setPristine();
    messages.clear();
    $scope.resetForm();
    $scope.cnpjValidation = $scope.VALIDATION.VALID;
    $scope.issueDateValidation = $scope.VALIDATION.VALID;
    $scope.openingDateValidation = $scope.VALIDATION.VALID;

  };

  $scope.filterValue = function($event) {
    if(isNaN(String.fromCharCode($event.charCode))) {
      $event.preventDefault();
    }
  };

  return {
    createCompany: $scope.createCompany,
    getStates: $scope.getStates,
    loadCities: $scope.loadCities,
    clearForm: $scope.clearForm,
    preventType: $scope.preventType,
    filterValue: $scope.filterValue,
    hasPartners: $scope.hasPartners,
    addPartner: $scope.addPartner,
    removePartner: $scope.removePartner
  };

}]);
