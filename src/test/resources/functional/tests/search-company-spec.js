var ListCompany = require('../pageObject/company-list.js');
var Search = require('../pageObject/search.js');

var search = new Search();
var listCompany = new ListCompany();

describe('Search company',function(){
    it('Should search a company',function(){
      browser.get('#/');
      var companyName = browser.params.validCompanyName;

      search.fillSearchField('');
      expect(search.isSearchButtonEnable()).toBe(false);

      search.fillSearchField('as');
      expect(search.isSearchButtonEnable()).toBe(true);
      search.cleanSearchField();

      search.fillSearchField(companyName);
      search.submitSearch();

      expect(listCompany.containsCompanyName(companyName)).toBe(true);
    });
});
