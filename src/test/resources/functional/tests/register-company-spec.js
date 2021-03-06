/*jshint -W079 */
var NewCompanyForm = require('../pageObject/new-company-form.js');
var ListCompany = require('../pageObject/company-list.js');
var ViewCompany = require('../pageObject/view-company.js');

var pdf;
var newCompanyForm = new NewCompanyForm();
var viewCompany = new ViewCompany();

beforeEach(function() {
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
    browser.get('http://localhost:5000/#/cadastro');
});

describe('Register Company', function() {
    it('should create a new company with partner', function() {
        var companyName = 'Brasil LTDA';
        var address = 'Avelino Nascimento';
        var number = '222';
        var complement = 'bloco B';
        var state = 'MG';
        var city = 'Almenara';
        var zip = '39900-000';
        var openingDate = '10/10/2015';
        var issueDate = '15/01/2014';
        var tradeName = browser.params.validCompanyName;
        var companyCNPJ = browser.params.validCNPJ;
        var partnerName = browser.params.validPartnerName;
        var partnerCPF = browser.params.validCPF;
        var invalidPartnerCPF = browser.params.invalidCPF;
        var invalidCNPJ = browser.params.invalidCNPJ;
        var incompleteCNPJ = browser.params.incompleteCNPJ;
        var invalidDate = browser.params.invalidDate;
        var companyList = new ListCompany();

        newCompanyForm.fillInvalidCNPJ(invalidCNPJ);
        expect(element(by.cssContainingText('.control-label', 'Número inválido')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillInvalidCNPJ(incompleteCNPJ);
        expect(element(by.cssContainingText('.control-label', 'Número incompleto')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillInvalidOpeningDate(invalidDate);
        expect(element.all(by.cssContainingText('.control-label', 'Data inválida')).first().isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillInvalidDocumentIssuanceDate(invalidDate);
        expect(element.all(by.cssContainingText('.control-label', 'Data inválida')).last().isDisplayed()).toBe(true);
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
        newCompanyForm.fillPartnerCPF(invalidPartnerCPF);
        expect(element(by.cssContainingText('.control-label', 'CPF Inválido')).isDisplayed()).toBe(true);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(false);
        newCompanyForm.clear();

        newCompanyForm.fillFields(companyCNPJ, tradeName, pdf, companyName, address, number, complement, state, city, zip, openingDate, issueDate);
        newCompanyForm.addNewPartner();
        newCompanyForm.fillPartnerName(partnerName);
        newCompanyForm.fillPartnerCPF(partnerCPF);
        expect(newCompanyForm.isSubmitButtonEnable()).toBe(true);
        newCompanyForm.submit();

        expect(newCompanyForm.isSaved()).toContain('Empresa '+ tradeName + ' foi cadastrada.');

        browser.get('http://localhost:5000/#/empresas');
        expect(companyList.containsCompanyName(tradeName)).toBe(true);

        companyList.clickCompanyName(tradeName);

        expect(viewCompany.getTradeName()).toEqual(tradeName);
        expect(viewCompany.getCompanyCnpj()).toEqual(companyCNPJ);
        expect(viewCompany.getDownload()).toEqual('Download de PDF');
        expect(viewCompany.getCompanyName()).toEqual(companyName);
        expect(viewCompany.getStreetName()).toEqual(address);
        expect(viewCompany.getNumber()).toEqual(number);
        expect(viewCompany.getComplement()).toEqual(complement);
        expect(viewCompany.getState()).toEqual(state);
        expect(viewCompany.getCity()).toEqual(city);
        expect(viewCompany.getCep()).toEqual(zip);
        expect(viewCompany.getOpeningDate()).toEqual(openingDate);
        expect(viewCompany.getIssueDate()).toEqual(issueDate);
        expect(viewCompany.getPartnerName()).toEqual(partnerName);
        expect(viewCompany.getPartnerCpf()).toEqual(partnerCPF);
        expect(viewCompany.getActivePartner()).toEqual('Não ativo');
    });

    it('should create a new company without partner', function() {
        var tradeName = browser.params.anotherValidCompanyName;
        var existentCNPJ = browser.params.validCNPJ;
        var companyCNPJ = browser.params.anotherValidCNPJ;
        var companyList = new ListCompany();

        newCompanyForm.fillInvalidCNPJ(existentCNPJ);
        expect(element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed()).toBe(true);
        newCompanyForm.clear();

        newCompanyForm.fillFields(companyCNPJ, tradeName, pdf);
        newCompanyForm.submit();

        expect(newCompanyForm.isSaved()).toContain('Empresa '+ tradeName + ' foi cadastrada.');

        browser.get('http://localhost:5000/#/empresas');
        expect(companyList.containsCompanyName(tradeName)).toBe(true);
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
