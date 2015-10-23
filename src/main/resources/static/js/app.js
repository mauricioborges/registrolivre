var app = angular.module("registro-livre", ["ngRoute","ui.mask", "ngTable", 'evaporate','720kb.datepicker', 'validate-cpf']);

app.config(["$routeProvider",
    function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "partials/search-companies.html",
            controller: ""
        })
        .when("/empresas", {
            templateUrl: "partials/companies.html",
            controller: "CompaniesListController"
        })
        .when("/cadastro", {
            templateUrl: "partials/new-company.html",
            controller: "NewCompanyController"
        })
        .when("/empresas/busca", {
            templateUrl: "partials/companies.html",
            controller: "SearchCompaniesController"
        })
        .when("/empresas/:companyId", {
            templateUrl: "partials/view-company.html",
            controller: "FindCompanyController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);

