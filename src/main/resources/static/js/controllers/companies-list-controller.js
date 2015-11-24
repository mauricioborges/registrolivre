app.controller('CompaniesListController', ['$scope', '$filter', 'NgTableParams', 'companies', '$rootScope', '$location', function($scope, $filter, NgTableParams, companies, $rootScope, $location) {
    function init() {
        $scope.companies = [];
        $scope.hasCompanies = false;
        $scope.companiesNotFoundMessage = 'Nenhum registro de empresa encontrado.';
        $rootScope.showMiniSearch = true;
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

    companies.all().then(function(response){
        if (!R.isEmpty(response)) {
            $scope.companies = response;
            $scope.hasCompanies = true;
            $scope.companiesNotFoundMessage = '';

            configureTableParams();
        }
    });

    $scope.showCompanyDetail = function(company) {
      $location.path('/empresas/' + company.id);
    };
}]);
