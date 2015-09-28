var NewCompanyForm = require('./pageObject/new-company-form.js');

var pdf;
var newCompanyForm = new NewCompanyForm();

beforeEach(function() {
    var fs = require('fs');
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
});

describe('Register Company', function() {
    it('should be disabled send button when enter in the page', function() {
        browser.get('http://localhost:8080/#/cadastro');

        expect(newCompanyForm.isSubmitButtonEnable()).toBe(false);
    });

  it('should create a new company', function() {
      browser.get('http://localhost:8080/#/cadastro');
      newCompanyForm.fillFields('57.863.988/0001-30', 'ZYGama Company LTDA2', pdf);
      newCompanyForm.submit();

      expect(newCompanyForm.isSaved()).toContain('Empresa ZYGama Company LTDA2 foi cadastrada.');
  });

  it('should clean form', function() {
      browser.get('http://localhost:8080/#/cadastro');
      newCompanyForm.fillFields('16.724.037/0001-00', 'Gama Company LTDA2', pdf);
      newCompanyForm.clear();

      expect(element(by.name('userForm')).getAttribute('class')).not.toMatch('ngDirty');
  });

  it('should allow upload the same file after save a company', function() {
      var verificarButton = element(by.id('verificar'));

      browser.get('http://localhost:8080/#/cadastro');
      newCompanyForm.fillFields('20.579.862/0001-28', 'Gama Company LTDA3', pdf);
      newCompanyForm.uploadDocument(pdf);

      expect(verificarButton.isDisplayed()).toBe(true);
  });

  it('should present message that CNPJ exist', function() {
        browser.get('http://localhost:8080/#/cadastro');
        newCompanyForm.fillFields('81.746.232/0001-95', 'ZYGama Company LTDA2', pdf);

        expect(newCompanyForm.CNPJExists()).toBe(true);
    });

    it('should present message that CNPJ is invalid', function() {
        browser.get('http://localhost:8080/#/cadastro');
        newCompanyForm.fillFields('11.111.111/1111-11', 'ZYGama Company LTDA2', pdf);

        expect(newCompanyForm.isCNPJValid()).toBe(false);
    });

    it('should present message that file is larger than 5MG', function() {
        var fs = require('fs');
            invalidPdf = require('path').resolve('./src/test/resources/annual_report_2009.pdf');

        browser.get('http://localhost:8080/#/cadastro');
        newCompanyForm.setFile(invalidPdf);

        expect(newCompanyForm.isPDFValid()).toBe(false);
    });
});

