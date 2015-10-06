describe('Directive: validate-cpf', function() {
    var element, scope;
    var VALID_CPF = "549.741.127-40";
    var INVALID_CPF = "100.000.000-00";

    partner = {
        cpf: "000.000.000-00",
    };

    beforeEach(module('registro-livre'));
    beforeEach(module('validate-cpf'));
    
    beforeEach(inject(function($rootScope, $compile) {
         validateCPFHTML = '<input type="text" class="form-control" data-ng:model="partner.cpf" '+
                           'ui-mask="999.999.999-99" name="cpf" id="cpf" validate-cpf />';

         scope = $rootScope;
         scope.partner = partner;
         element = $compile(validateCPFHTML)(scope);
         scope.$digest();
    }));

    it('should accept valid cpf', function() {
        scope.partner.cpf = VALID_CPF;
        scope.$digest();
        element.triggerHandler('blur');
        element.hasClass('ng-invalid').should.be.false;
    });

    it('should NOT accept invalid cpf', function() {
        scope.partner.cpf = INVALID_CPF;
        scope.$digest();
        element.triggerHandler('blur');
        element.hasClass('ng-invalid').should.be.true;
    });
});