var NewCompanyForm = require('./pageObject/new-company-form.js');
var NavBar = require('./pageObject/nav-bar.js');
var CompanyList = require('./pageObject/company-list.js');

var pdf;
var newCompanyForm = new NewCompanyForm();
var companyList = new CompanyList();


beforeEach(function() {
    var fs = require('fs');
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
});

describe('Register Company', function() {
  it('should create a new company', function() {
      var navBar = new NavBar();

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
});

