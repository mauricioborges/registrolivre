describe('Controller: NewCompanyController', function() {
 var $rootScope, $scope, $controller, $httpBackend, messages;
    beforeEach(module('registro-livre'));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        messages = $injector.get('messages');
    }));

    it('should create a new company', inject(function(companies) {
        var spy = sinon.spy();
        var newCompany = function() {
            return {
                then: spy
             };
        };

        var controller = $controller('NewCompanyController', { $scope: $scope, companies: { newCompany: newCompany }, messages: messages});
        $scope.evaData.files = [{ url: 'http://registro-livre-tw.s3.amazonaws.com/example_company.pdf' }];
        var company = {
          cnpj: '231231',
          name: 'Example Company'
        };
        controller.createCompany(company);
        spy.should.have.been.called.once;
    }));

    it('should show success message and clear the form after create new company', inject(function() {
        var showSuccess = sinon.spy();
        var resetForm = sinon.spy();
        var newCompany = function() {
            return {
                then: function(successCallback) {
                    successCallback();
                }
             };
        };

        var controller = $controller('NewCompanyController', { $scope: $scope, companies: { newCompany: newCompany }, messages: { showSuccess: showSuccess }});
        $scope.resetForm = resetForm;
        $scope.evaData.files = [{ url: 'http://registro-livre-tw.s3.amazonaws.com/example_company.pdf' }];
        var company = {
          cnpj: '231231',
          name: 'Example Company'
        };
        var pristineMock = sinon.spy();
        var formMock = {
            $setPristine: pristineMock
        };
        $scope.userForm = formMock;
        controller.createCompany(company);
        showSuccess.should.have.been.called.once;
        resetForm.should.have.been.called.once;
        formMock.$setPristine.should.have.been.called.once;
    }));

    it('should show danger message when server any error happens', inject(function() {
        var spy = sinon.spy();
        var newCompany = function() {
            return {
                then: function(successCallback, errorCallback) {
                    errorCallback();
                }
             };
        };

        var controller = $controller('NewCompanyController', { $scope: $scope, companies: { newCompany: newCompany }, messages: { showDanger: spy }});
        $scope.evaData.files = [{ url: 'http://registro-livre-tw.s3.amazonaws.com/example_company.pdf' }];
        var company = {
          cnpj: '231231',
          name: 'Example Company'
        };
        controller.createCompany(company);
        spy.should.have.been.called.once;
    }));

    it('Should get states from states-and-cities service', function(){
        var spy = sinon.spy();
        var controller = $controller('NewCompanyController', { $scope: $scope, statesAndCities: { getStates: spy }});

        controller.getStates();

        spy.should.have.been.called.once;
    });

    it('Should get cities from states-and-cities service', function() {
        var spy = sinon.spy();
        var state =  'RS';

        var controller = $controller('NewCompanyController', { $scope: $scope, statesAndCities: { getCitiesByState: spy }});
        $scope.company = {
            state: state
        };
        controller.loadCities();
        assert(spy.calledWith(state));
    });

    it('Should clear form and messages when hit reset form button', function() {
        var clearMessages = sinon.spy();

        var pristineMock = sinon.spy();
        var formMock = {
            $setPristine: pristineMock
        };
        var controller = $controller('NewCompanyController', { $scope: $scope, messages: { clear: clearMessages }});
        $scope.evaData.clearFiles = sinon.spy();
        controller.clearForm(formMock);
        clearMessages.should.have.been.called.once;
        formMock.$setPristine.should.have.been.called.once;
        $scope.company.should.be.deep.equal({});
        expect($scope.cnpjValidation).to.be.equal($scope.VALIDATION.VALID);
    });

    it('Should detect when CNPJ is invalid', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('invalidCnpj');
        expect($scope.cnpjValidation).to.be.equal($scope.VALIDATION.INVALID);
    });

    it('Should detect when CNPJ is incomplete', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('incompleteCnpj');
        expect($scope.cnpjValidation).to.be.equal($scope.VALIDATION.INCOMPLETE);
    });

    it('Should detect when CNPJ is valid', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('validCnpj');
        expect($scope.cnpjValidation).to.be.equal($scope.VALIDATION.VALID);
    });

    it('Should detect when CNPJ is duplicated', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('duplicatedCnpj');
        expect($scope.cnpjValidation).to.be.equal($scope.VALIDATION.DUPLICATED);
    });

    it('Should detect when issueDate is valid', function() {
       $controller('NewCompanyController', { $scope: $scope });
       $rootScope.$broadcast('issueDateValid');
       expect($scope.issueDateValidation).to.be.equal($scope.VALIDATION.VALID);
    });

    it('Should detect when issueDate is invalid', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('issueDateInvalid');
        expect($scope.issueDateValidation).to.be.equal($scope.VALIDATION.INVALID);
    });

    it('Should detect when openingDate is valid', function() {
       $controller('NewCompanyController', { $scope: $scope });
       $rootScope.$broadcast('openingDateValid');
       expect($scope.openingDateValidation).to.be.equal($scope.VALIDATION.VALID);
    });

    it('Should detect when openingDate is invalid', function() {
        $controller('NewCompanyController', { $scope: $scope });
        $rootScope.$broadcast('openingDateInvalid');
        expect($scope.openingDateValidation).to.be.equal($scope.VALIDATION.INVALID);
    });

    it('Should not prevent typing when typing a number', function(){
        var spy = sinon.spy();
        var event = {
            charCode: 49,
            preventDefault: spy
        };
        var controller = $controller('NewCompanyController', { $scope: $scope });
        controller.filterValue(event);
        expect(spy).not.to.have.been.called;
    });

    it('Should prevent typing when typing anything other than a number', function(){
        var spy = sinon.spy();
        var event = {
            charCode: 8,
            preventDefault: spy
        };
            var controller = $controller('NewCompanyController', { $scope: $scope });
            controller.filterValue(event);
            expect(spy).to.have.been.called;
        });

    it('Should have not any partner when load the controller', function(){
        var controller = $controller('NewCompanyController', { $scope: $scope });

        expect(false).to.be.equal(controller.hasPartners());
    });

    it('Should have a partner when add a new Partner', function(){
        var controller = $controller('NewCompanyController', { $scope: $scope });
        controller.addPartner();
        expect(true).to.be.equal(controller.hasPartners());
    });

    it('Should have not a partner when remove the unique partner in controller', function(){
        $scope.company = {partners: [{}]};
        var controller = $controller('NewCompanyController', { $scope: $scope });

        controller.removePartner(0);

        expect(false).to.be.equal(controller.hasPartners());
    });

});
