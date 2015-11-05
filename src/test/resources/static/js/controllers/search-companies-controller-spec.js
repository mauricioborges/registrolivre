describe('Controller: SearchCompaniesController', function() {
    var $rootScope, $scope, $controller, $httpBackend, companies;

    beforeEach(module('registro-livre'));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        companies = $injector.get('companies');

        $controller('SearchCompaniesController', {
            '$scope': $scope,
            companies: companies
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should get all found companies', function() {
        var expectedCompanies = [{id: 1, cnpj: '123456', tradeName: 'Company One Ltda'}, {id: 2, cnpj: '654321', tradeName: 'Company Two, Inc'}];

        $httpBackend.when('GET', '/empresas/busca', {'q': 'company'}).respond(200, expectedCompanies);

        $httpBackend.flush();

        $scope.companies.should.be.deep.equal(expectedCompanies);
    });

    it('should display message when does not found companies', function () {
        var expectedCompanies = [];

        $httpBackend.when('GET', '/empresas/busca', {'q': 'company'}).respond(200, expectedCompanies);

        $httpBackend.flush();

        $scope.companiesNotFoundMessage.should.be.equal('Nenhum registro de empresa encontrado.');
        $scope.hasCompanies.should.equal(false);
    });

    it('should not display message when found one or more companies', function () {
        var expectedCompanies = [{id: 1, cnpj: '123456', tradeName: 'Company One Ltda'}];

        $httpBackend.when('GET', '/empresas/busca', {'q': 'company'}).respond(200, expectedCompanies);

        $httpBackend.flush();

        $scope.companiesNotFoundMessage.should.be.equal('');
        $scope.hasCompanies.should.equal(true);
    });
});