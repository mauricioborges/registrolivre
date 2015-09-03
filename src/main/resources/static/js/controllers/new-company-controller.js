app.controller("NewCompanyController", ["$scope", "$document", "companies", "messages", "statesAndCities", "fileUploaderFactory", function($scope, $document, companies, messages, statesAndCities, fileUploaderFactory) {
  fileUploaderFactory.setFileUploaderOptions($scope, $document);

  $scope.getStates = function() {
    return statesAndCities.getStates();
  };

  $scope.loadCities = function () {
    return $scope.company && statesAndCities.getCitiesByState($scope.company.UF);
  };

  $scope.createCompany = function(company) {
    var file = $scope.evaData.files[0];
    if (!file) {
      messages.showDanger("Você deve carregar um arquivo antes de continuar.");
    }
    company.documents = [{
      url: file.url
    }];
    companies.newCompany(company).then(function(response) {
           messages.showSuccess("Empresa <strong>"+ company.tradeName +"</strong> foi cadastrada.");
           $scope.resetForm();
        }, function(response) {
           messages.showDanger("Ocorreu um erro no sistema, por favor tente novamente.");
        });
    }

  $scope.resetForm = function() {
    $scope.company = {};
    $document.find(".has-feedback").removeClass("has-error has-success");
    $document.find("#btn-submit").attr("disabled", true);
    $scope.evaData.clearFiles();
  }

  $scope.clearForm = function(form) {
    form.$setPristine();
    messages.clear();
    $scope.resetForm();
  }

  return {
    createCompany: $scope.createCompany,
    getStates: $scope.getStates,
    loadCities: $scope.loadCities,
    clearForm: $scope.clearForm
  };

}]);
