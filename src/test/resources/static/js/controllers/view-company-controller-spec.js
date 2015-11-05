describe('Controller: CompanyViewController', function() {
    var $rootScope, $scope, $controller, $httpBackend, companies, $routeParams;

    beforeEach(module('registro-livre'));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        companies = $injector.get('companies');

        $routeParams = {
            companyId: 1
        };
        $controller('CompanyViewController', {
            '$scope': $scope,
             companies: companies,
             $routeParams: $routeParams
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should get a company by id', function() {
        var documents = {id:4,company:null,url:'http://ubimob2013.sciencesconf.org/21283/document',issueDate:'10/10/2015'};
        var expectedCompany = {
           id :  1,
           cnpj :'123456',
           tradeName : 'Company One Ltda',
           documents : documents
           };

        $httpBackend.expectGET('/empresas/' + expectedCompany.id).respond(expectedCompany);

        $httpBackend.flush();

        expect($scope.company.id).to.equal(expectedCompany.id);
        expect($scope.company.cnpj).to.equal(expectedCompany.cnpj);
        expect($scope.company.tradeName).to.equal(expectedCompany.tradeName);
    });
});
