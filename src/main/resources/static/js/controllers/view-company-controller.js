app.controller('CompanyViewController', ['$scope', '$filter', 'ngTableParams', 'companies', '$routeParams', '$location', '$http',
   function($scope, $filter, ngTableParams, companies, $routeParams) {
    var companyId = $routeParams.companyId;
    companies.getCompanyById(companyId).success(function(response) {
        $scope.company = {
            'id' : response.id,
            'cnpj' : response.cnpj,
            'tradeName' : response.tradeName,
            'companyName' : response.companyName,
            'streetName' : response.streetName,
            'number' : response.number,
            'complement' : response.complement,
            'city' : response.city,
            'state' : response.state,
            'cep' : response.cep,
            'openingDate' : response.openingDate,
            'documents': response.documents[0],
            'file' : response.file,
        };
    });
}]);

app.filter('showHyphen',
    function () {
        return function (obj) {
           if(obj === null){
               return '-';
           }else{
               return obj;
           }
        };
    });