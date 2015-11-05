app.controller('SearchCompaniesController', ['$scope', '$filter', '$location', 'NgTableParams', 'companies', function($scope, $filter, $location, NgTableParams, companies) {

    function init() {
        $scope.companies = [];
        $scope.hasCompanies = false;
        $scope.companiesNotFoundMessage = 'Nenhum registro de empresa encontrado.';
        $scope.searchCompanies = searchCompanies;
    }

    function searchCompanies() {
        $location.path('/empresas/busca').search({ 'q': $scope.q });
    }

    function configureTableParams() {
        $scope.tableParams = new NgTableParams({
            page: 1,
            count: 1000,
            sorting: {
                tradeName: 'asc'
            }
        }, {
            total: $scope.companies.length,
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')($scope.companies, params.orderBy()) : $scope.companies;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    }

    init();

    companies.allFound($location.search().q).then(function(response) {
        if (!R.isEmpty(response)) {
            $scope.companies = response;
            $scope.hasCompanies = true;
            $scope.companiesNotFoundMessage = '';

            configureTableParams();
        }
    });
}]);
