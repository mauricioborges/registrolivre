describe('Directive: only-digits-validation', function() {
      var element, scope;
      var VALID_NUMBER = '123456789';
      var LETTERS = 'abcdef';
      var SPECIAL_CHARS = '#ˆ\'˜';

      company = {
          number: '349'
      }

      beforeEach(module('registro-livre'));

      beforeEach(inject(function($rootScope, $compile) {
          onlyDigitsHTML = '<input type="text" ng-model="company.number" name="empresa.nomeNumero" ' +
                           ' id="nomeNumero" maxlength="9" only-digits />';

          scope = $rootScope;
          scope.company = company;
          element = $compile(element)(scope);
          scope.$digest();
      }));

      it('should accepts valid number', function() {
          element.val(VALID_NUMBER);
          element.triggerHandler('input');
          expect(element.val()).to.equal(VALID_NUMBER);
      });

      it('should NOT accepts letters', function() {
          shouldBeEmpty(LETTERS);
      });

      it('should NOT accepts special chars', function() {
          shouldBeEmpty(SPECIAL_CHARS);
      });

      it('should NOT accepts special chars + letters', function() {
          shouldBeEmpty(SPECIAL_CHARS + LETTERS);
      });

      function shouldBeEmpty(input_text) {
          element.val(input_text);
          element.triggerHandler('input');
          expect(element.val()).to.equal('');
      }
});
