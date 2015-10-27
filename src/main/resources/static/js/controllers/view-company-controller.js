app.controller("CompanyViewController", ["$scope", "$filter", "ngTableParams", "companies", "$routeParams", "$location", "$http",
   function($scope, $filter, ngTableParams, companies, $routeParams, $location, $http) {

    var companyId = $routeParams.companyId;

    companies.getCompanyById(companyId).success(function(response) {
        $scope.company = {
            "id" : response.id,
            "cnpj" : response.cnpj,
            "tradeName" : response.tradeName,
            "companyName" : response.companyName,
            "streetName" : response.streetName,
            "number" : response.number,
            "complement" : response.complement,
            "city" : response.city,
            "state" : response.state,
            "cep" : response.cep,
            "openingDate" : response.openingDate,
            "cep" : response.cep,
            "file" : response.file,
        };
    });
}]);
