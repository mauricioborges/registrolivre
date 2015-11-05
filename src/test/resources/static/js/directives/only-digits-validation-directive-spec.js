describe('Directive: onlyAlphanumeric-validation', function() {
      var element, scope;
      var VALID_NUMBER = '123456789';
      var LETTERS = 'abcdef';
      var SPECIAL_CHARS = '#ˆ\'˜';

      var company = {
          number: '349'
      };

      beforeEach(module('registro-livre'));

      beforeEach(inject(function($rootScope, $compile) {
          var onlyDigitsHTML = '<input type='+'text'+' ng-model='+'company.number'+' name='+'empresa.nomeNumero'+' ' +
                           ' id='+'number'+' maxlength='+'9'+' only-alphanumeric />';

          scope = $rootScope;
          scope.company = company;
          element = $compile(onlyDigitsHTML)(scope);
          scope.$digest();
      }));

      it('should accepts valid number', function() {
          element.val(VALID_NUMBER);
          element.triggerHandler('input');
          expect(element.val()).to.equal(VALID_NUMBER);
      });

      it('should accepts letters', function() {
          element.val(LETTERS);
          element.triggerHandler('input');
          expect(element.val()).to.equal(LETTERS);
      });

      it('should accepts digit + letters', function() {
          element.val(VALID_NUMBER + LETTERS);
          element.triggerHandler('input');
          expect(element.val()).to.equal(VALID_NUMBER + LETTERS);
      });

      it('should NOT accepts special chars', function() {
          shouldBeEmpty(SPECIAL_CHARS);
      });

      it('should accepts ONLY letters when letters and special', function() {
          element.val(SPECIAL_CHARS + LETTERS);
          element.triggerHandler('input');
          expect(element.val()).to.equal(LETTERS);
      });

      it('should accepts ONLY digits when digits and special', function() {
          element.val(SPECIAL_CHARS + VALID_NUMBER);
          element.triggerHandler('input');
          expect(element.val()).to.equal(VALID_NUMBER);
      });

      function shouldBeEmpty(inputText) {
          element.val(inputText);
          element.triggerHandler('input');
          expect(element.val()).to.equal('');
      }
});
