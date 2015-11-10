var NewCompanyForm = require('../pageObject/new-company-form.js');
var ListCompany = require('../pageObject/company-list.js');
var ViewCompany = require('../pageObject/view-company.js');

var pdf;
var newCompanyForm = new NewCompanyForm();
var listCompany = new ListCompany();
var viewCompany = new ViewCompany();

beforeEach(function() {
    pdf = require('path').resolve('./src/test/resources/file_uploader_functional_test.pdf');
    browser.get('http://localhost:5000/#/cadastro');
});

describe('View company', function() {
    it('Should visualize company information', function() {
        var tradeName = browser.params.anotherValidCompanyName;
        var companyName = "my company name";
        newCompanyForm.fillFields(browser.params.anotherValidCNPJ, tradeName, pdf, companyName);
        newCompanyForm.submit();

        browser.get('http://localhost:5000/#/empresas');
        expect(listCompany.containsCompanyName(tradeName)).toBe(true);

        listCompany.clickCompanyName(tradeName);

        //expect(viewCompany.getCompanyName()).toEqual(companyName);
        expect(viewCompany.getTradeName()).toEqual(tradeName);
        expect(viewCompany.getCompanyCnpj()).toEqual(browser.params.anotherValidCNPJ);
        expect(viewCompany.getDownload()).toEqual('Download de PDF');

    });
});



