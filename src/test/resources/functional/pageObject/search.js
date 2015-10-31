var Search = function () {

    this.fillSearchField = function(company) {
          element(by.id("search-input")).sendKeys(company);
    };

    this.submitSearch = function() {
          element(by.id("btn-submit")).click();
    };

    this.isSearchButtonEnable = function() {
          return element(by.id('search-input')).isEnabled();
    };
};

module.exports = Search;