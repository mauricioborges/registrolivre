app.factory("companies", ["$http", function($http) {

    function all() {
        return $http.get('/empresas').then(function(response) {
            return response.data;
        });
    }

    function newCompany(company) {
        return $http.post('/cadastro', company).then(function(response) {
            return response.status;
        });
    }

    function getCompanyByCnpj(cnpj) {
        return $http.get('/buscar-por-cnpj', { params:{'cnpj': cnpj } });
    }

    function getCompanyById(companyId) {
        return $http.get('/empresas/' + companyId);
    }

    function allFound(tradeName) {
        return $http.get('/empresas/busca', { params: { 'q': tradeName } }).then(function(response) {
            return response.data;
        });
    }

    return {
        all: all,
        getCompanyById:getCompanyById,
        newCompany: newCompany,
        getCompanyByCnpj: getCompanyByCnpj,
        allFound: allFound
    };
}]);
