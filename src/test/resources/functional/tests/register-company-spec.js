var NewCompanyForm = require('../pageObject/new-company-form.js');
var ListCompany = require('../pageObject/company-list.js');

var pdf;
newCompanyForm = new NewCompanyForm();

beforeEach(function() {
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
    browser.get('http://localhost:5000/#/cadastro');
});

describe('Register Company', function() {
    newCompanyForm = new NewCompanyForm();

    it('should create a new company with partner', function() {
        var companyName = browser.params.validCompanyName;
        var companyCNPJ = browser.params.validCNPJ;
        var partnerName = browser.params.validPartnerName;
        var partnerCPF = browser.params.validCPF;
        var partnerCPFInvalid = browser.params.invalidCPF;
        var cnpjInvalid = browser.params.cnpjInvalid;
        var cnpjIncomplete = browser.params.cnpjIncomplete;
        var listCompany = new ListCompany();

        newCompanyForm.fillInvalidCNPJ(cnpjInvalid);
        expect(element(by.cssContainingText('.control-label', 'Número inválido')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillInvalidCNPJ(cnpjIncomplete);
        expect(element(by.cssContainingText('.control-label', 'Número incompleto')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.addNewPartner();
        newCompanyForm.fillPartnerName(partnerName);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(false);
        newCompanyForm.clear();

        newCompanyForm.addNewPartner();
        newCompanyForm.fillPartnerCPF(partnerCPF);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(false);
        newCompanyForm.clear();

        newCompanyForm.addNewPartner();
        newCompanyForm.fillPartnerCPF(partnerCPFInvalid);
        expect(element(by.cssContainingText('.control-label', 'CPF Inválido')).isDisplayed()).toBe(true);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(false);
        newCompanyForm.clear();

        newCompanyForm.fillFields(companyCNPJ, companyName, pdf);
        newCompanyForm.addNewPartner();
        newCompanyForm.fillPartnerName(partnerName);
        newCompanyForm.fillPartnerCPF(partnerCPF);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(true);
        newCompanyForm.submit();

        expect(newCompanyForm.isSaved()).toContain('Empresa '+ companyName + ' foi cadastrada.');

        browser.get('http://localhost:5000/#/empresas');
        expect(listCompany.containsCompanyName(companyName)).toBe(true);
    });

    it('should create a new company without partner', function() {
        var companyName = browser.params.otherValidCompanyName;
        var existentCNPJ = browser.params.validCNPJ;
        var companyCNPJ = browser.params.otherValidCNPJ;
        var listCompany = new ListCompany();

        newCompanyForm.fillInvalidCNPJ(existentCNPJ);
        expect(element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

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
