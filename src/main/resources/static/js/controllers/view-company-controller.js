app.controller("CompanyViewController", ["$scope", "$filter", "ngTableParams", "companies", "$routeParams", "$location", "$http",
   function($scope, $filter, ngTableParams, companies, $routeParams) {
    var companyId = $routeParams.companyId;

    companies.getCompanyById(companyId).success(function(response) {
    console.log(response.documents[0]);
        $scope.company = {
            "id" :  response.id,
            "cnpj" :mostraNull(response.cnpj),
            "tradeName" : mostraNull(response.tradeName),
            "companyName" : mostraNull(response.companyName),
            "streetName" : mostraNull(response.streetName),
            "number" : mostraNull(response.number),
            "complement" : mostraNull(response.complement),
            "city" : mostraNull(response.city),
            "state" : mostraNull(response.state),
            "cep" : mostraNull(response.cep),
            "openingDate" : mostraNull(response.openingDate),
            documents: response.documents[0],
            //"issueDate":mostraNull(response.documents[0].issueDate)
        };
    });
    function mostraNull(obj)
    {
      if(obj === null){
       return "-";
       }else{
      return obj;
      }
    }

  $scope.mostraNullHTML = function (obj) {
      if(obj === null){
       return "-";
       }else{
      return obj;
      }
    };

}]);