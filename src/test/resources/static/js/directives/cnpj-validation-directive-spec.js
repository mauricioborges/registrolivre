describe('Directive: cnpj-validation', function() {
  var elm, scope;
  var validCnpj = "27.853.013/0001-60";
  company = {
    cnpj: '38.366.166/0001-07',
  }

  beforeEach(module('registro-livre', function($provide) {
        $provide.value("companies", {
            getCompanyByCnpj: function(cnpj) {
                return {
                   then: function(success, error404) {
                    if(cnpj == validCnpj) success();
                    else error404();
                   }
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
         '<span ng-show="isCnpjDuplicated"><label class="control-label">Já existe empresa com esse CNPJ</label></span>' +
         '<span ng-show="isCnpjIncomplete"><label class="control-label">Número incompleto</label></span>' +
         '<span ng-show="isCnpjInvalid"><label class="control-label">Número inválido</label></span>' +
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

    it('should emit incompleteCnpj message when CNPJ is incomplete',function(){
         var spy = sinon.spy();
         scope.$emit = spy;
         var input = elm.find('input');
         scope.company.cnpj = "11.111.111/11-11";
         scope.$digest();
         input.triggerHandler('blur');
         spy.should.have.been.calledWith("incompleteCnpj");
    });

    it('should show invalid message if CNPJ is invalid',function(){
       var spy = sinon.spy();
       scope.$emit = spy;
       var input = elm.find('input');
       scope.company.cnpj = "04.114.710/0001-00";
       scope.$digest();
       input.triggerHandler('blur');
       spy.should.have.been.calledWith("invalidCnpj")
    });
    it('should not show invalid message if CNPJ is valid',function(){
           var spy = sinon.spy();
           scope.$emit = spy;
           var input = elm.find('input');
           scope.company.cnpj = "27.926.046/0001-92";
           scope.$digest();
           input.triggerHandler('blur');
           spy.should.have.not.been.calledWith("invalidCnpj");
           spy.should.have.been.calledWith("validCnpj")
    });
    it('should show duplicateCnpj message when CNPJ already exists in DB',function(){
           var spy = sinon.spy();
           scope.$emit = spy;
           var input = elm.find('input');
           scope.company.cnpj = "27.853.013/0001-60";
           scope.$digest();
           input.triggerHandler('blur');
           spy.should.have.been.calledWith("duplicatedCnpj")
    });

});