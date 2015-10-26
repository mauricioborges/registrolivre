var NewCompanyForm = require('../pageObject/new-company-form.js');
var ListCompany = require('../pageObject/company-list.js');

var pdf;
var newCompanyForm = new NewCompanyForm();

beforeEach(function() {
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
    browser.get('http://localhost:5000/#/cadastro');
});

describe('Register Company', function() {
    it('should create a new company with partner', function() {
        var companyName = browser.params.name;
        var companyCNPJ = browser.params.cnpj;
        var partnerName = browser.params.partnerName;
        var partnerCPF = browser.params.cpf;
        var cnpjInvalid = browser.params.cnpjInvalid;
        var cnpjIncomplete = browser.params.cnpjIncomplete;
        var listCompany = new ListCompany();

        newCompanyForm.fillInvalidCNPJ(cnpjInvalid);
        expect(element(by.cssContainingText('.control-label', 'Número inválido')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillInvalidCNPJ(cnpjIncomplete);
        expect(element(by.cssContainingText('.control-label', 'Número incompleto')).isDisplayed()).toBe(true);
        newCompanyForm.clear();


        newCompanyForm.fillFields(companyCNPJ, companyName, pdf);
        newCompanyForm.fillPartnerFields(partnerName, partnerCPF);
        newCompanyForm.submit();

        expect(newCompanyForm.isSaved()).toContain('Empresa '+ companyName + ' foi cadastrada.');

        browser.get('http://localhost:5000/#/empresas');
        expect(listCompany.containsCompanyName(companyName)).toBe(true);
    });

    it('should create a new company without partner', function() {
        var companyName = browser.params.name2;
        var companyCNPJ = browser.params.cnpj2;
        var listCompany = new ListCompany();

        newCompanyForm.fillFields(companyCNPJ, companyName, pdf);
        newCompanyForm.submit();

        expect(newCompanyForm.isSaved()).toContain('Empresa '+ companyName + ' foi cadastrada.');

        browser.get('http://localhost:5000/#/empresas');
        expect(listCompany.containsCompanyName(companyName)).toBe(true);

    });

    it('should clean form', function() {
        newCompanyForm.fillFields('16.724.037/0001-00', 'Gama Company LTDA2', pdf);
        newCompanyForm.clear();

        expect(element(by.name('userForm')).getAttribute('class')).not.toMatch('ngDirty');
    });

    it('should allow upload the same file after save a company', function() {
        var verifyButton = element(by.id('verify'));

        newCompanyForm.fillFields('20.579.862/0001-28', 'Gama Company LTDA3', pdf);
        newCompanyForm.uploadDocument(pdf);

        expect(verifyButton.isDisplayed()).toBe(true);
    });
});
