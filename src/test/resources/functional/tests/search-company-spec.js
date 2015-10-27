var ListCompany = require('../pageObject/company-list.js');
var Search = require('../pageObject/search.js');

var search = new Search();
var listCompany = new ListCompany();

describe('Search company',function(){
    it('Should search a company',function(){
      browser.get('http://localhost:5000/#/');

      var companyName = browser.params.validCompanyName;
      search.fillSearchField(companyName);
      search.submitSearch();

      expect(listCompany.containsCompanyName(companyName)).toBe(true);


    });
});
