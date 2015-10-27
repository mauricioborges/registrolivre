app.controller("CompanyViewController", ["$scope", "$filter", "ngTableParams", "companies", "$routeParams", "$location", "$http",
   function($scope, $filter, ngTableParams, companies, $routeParams, $location, $http) {

    //console.log("AAAAAA:"+JSON.stringify($location));
   //  console.log("AAAAAA:"+JSON.stringify($routeParams)); // Quero saber o que vem aqui dentro
    var param1 = $routeParams.companyId;
    //$scope.cnpj = param1; // numero de Empresa

    getCompanyById(param1).success(function(response)
    {
      $scope.cnpj = response.cnpj;
      $scope.tradeName = response.tradeName;
      $scope.companyName = response.companyName;
      $scope.streetName = response.streetName;
      $scope.number = response.number;
      $scope.complement = response.complement;
      $scope.city = response.city;
      $scope.state = response.state;
      $scope.cep = response.cep;
        $scope.openingDate = response.openingDate;
        $scope.cep = response.cep;
        $scope.issueDate = response.documents[0].issueDate;
        $scope.url = response.documents[0].url;
        $scope.file = response.file;
    });


function getCompanyById(companyId) {
        return $http.get('/empresas/' + companyId);
    }
}]);
