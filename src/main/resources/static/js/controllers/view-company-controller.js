app.controller('CompanyViewController', ['$scope', '$filter', 'ngTableParams', 'companies', '$routeParams', '$rootScope',
   function($scope, $filter, ngTableParams, companies, $routeParams, $rootScope) {
   $rootScope.showMiniSearch = true;
    var companyId = $routeParams.companyId;
    companies.getCompanyById(companyId).success(function(response) {
        $scope.company = {
            'id' :  response.id,
            'cnpj' :response.cnpj,
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
            'file': response.file,
            'partners': response.partners
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