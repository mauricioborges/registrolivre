app.controller("SearchCompaniesController", ["$scope", "$filter", "companies", function($scope, $filter, companies) {
    function init() {
        $scope.companies = [];
        $scope.hasCompanies = false;
        $scope.companiesNotFoundMessage = "Nenhum registro de empresa encontrado.";
    }
}]);