var Search = function () {

    this.fillSearchField = function(company) {
          element(by.id("search-input")).sendKeys(company);
    };

    this.submitSearch = function() {
          element(by.id("btn-submit")).click();
    };

    this.isSearchButtonEnable = function() {
          return element(by.id('btn-submit')).isEnabled();
    };

    this.cleanSearchField = function() {
          browser.executeScript('document.getElementById("search-input").value = ""');
    };

};

module.exports = Search;