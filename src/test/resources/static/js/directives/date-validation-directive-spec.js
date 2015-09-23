describe('Directive: date-validation', function() {
    var element;
    var scope;
    var spy;
    var validDate = "01/01/2015";
    var invalidDate = "31/02/2015";
    var dateFormat = "__/__/____";
    var company = {
        issueDate: ""
    };
    beforeEach(module('registro-livre'));
    beforeEach(inject(function($rootScope, $compile) {
         element = angular.element(
            '<div class="form-group has-feedback" id="nomeDataDoDocumento-group">' +
            '<input date-validation class="form-control" id="issueDate" ng-model="company.issueDate" type="text" ui-mask="?99/99/9999" autocomplete="off" model-view-value="true"/>' +
            '</div>'
         );

        scope = $rootScope;
        scope.company = company;
        $compile(element)(scope);
        scope.$digest();
        spy = sinon.spy();
        scope.$emit = spy;
     }));

    it("should validate empty date", function() {
        var input = element.find("input");
        input.triggerHandler('blur');
        input.hasClass('ng-valid').should.be.true;
        spy.should.have.been.calledWith("issueDateValid");
    });

    it("should invalidate incorrect date", function() {
        var input = element.find("input");
        scope.company.issueDate = invalidDate;
        scope.$digest();
        input.triggerHandler('blur');
        input.hasClass('ng-invalid').should.be.true;
        spy.should.have.been.calledWith("issueDateInvalid");
    });

    it("should validate correct date", function() {
        var input = element.find("input");
        scope.company.issueDate = validDate;
        scope.$digest();
        input.triggerHandler('blur');
        input.hasClass('ng-valid').should.be.true;
        spy.should.have.been.calledWith("issueDateValid");
    })

});