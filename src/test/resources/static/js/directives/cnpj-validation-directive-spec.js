describe('Directive: cnpj-validation', function() {
  var elm, scope;

  scope = {
    company: {
        cnpj: '38.366.166/0001-07',
    }
  };

  beforeEach(module('registro-livre', function($provide) {
        $provide.value("companies", {
            getCompanyByCnpj: function() {
                return {
                   then: function(success, error404) { error404(); }
                }
            }
        });
  }));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div class="form-group has-feedback " id="cnpj-group" >' +
         '<label class="control-label">CNPJ <abbr class="cor-vermelha" alt="Preenchimento obrigatório" title="Preenchimento obrigatório">*</abbr></label>' +
         '<input cnpj-validation class="form-control required" ng-model="company.cnpj"  type="text" name="empresa.cnpj" id="cnpj"' +
         'autocomplete="off" ui-mask="?99.999.999/9999-99" model-view-value="true" required/>' +
      '</div>');
    scope = $rootScope;
    scope.company = company;
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('should validate correct cnpj', function() {

    var input = elm.find('input');
    scope.company.cnpj = "59.026.733/0001-48";
    scope.$digest();
    input.triggerHandler('blur');

    input.hasClass('ng-valid').should.be.true;
  });

  it('should invalidate cnpj with incorrect length', function() {

      var input = elm.find('input');
      scope.company.cnpj = "59.026.733/1-48";
      scope.$digest();
      input.triggerHandler('blur');

      input.hasClass('ng-invalid').should.be.true;
    });

  it('should invalidate cnpj with invalid CNPJ', function() {

      var input = elm.find('input');
      scope.company.cnpj = "11.111.111/1111-11";
      scope.$digest();
      input.triggerHandler('blur');

      input.hasClass('ng-invalid').should.be.true;
    });


});