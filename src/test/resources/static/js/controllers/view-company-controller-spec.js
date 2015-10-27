describe("Controller: CompanyViewController", function() {
    var $rootScope, $scope, $controller, $httpBackend, companies;

    beforeEach(module('registro-livre'));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        companies = $injector.get('companies');

        $controller('CompanyViewController', {
            '$scope': $scope,
             companies: companies
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should get a company by id", function() {
        var expectedCompany = {id: 1, cnpj: "123456", tradeName: "Company One Ltda"};

        $httpBackend.expectGET('/empresas/' + expectedCompany.id).respond(expectedCompany);



        $scope.company.should.be.deep.equal(expectedCompany);
    });
});