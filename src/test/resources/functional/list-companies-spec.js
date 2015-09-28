var ListCompany = require('./pageObject/company-list.js');

var pdf;
var listCompany = new ListCompany();

beforeEach(function() {

});

describe('List Companies', function() {
    it('should be presented a company with name "Test CNPJ"', function() {
        browser.get('http://localhost:8080/#/empresas');

        expect(listCompany.containsCompanyName('Test CNPJ')).toBe(true);
    });
});