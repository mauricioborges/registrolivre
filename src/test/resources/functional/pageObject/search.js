var Search = function () {

    this.fillSearchField = function(company) {
          element(by.id("search-input")).sendKeys(company);
    };
     this.submitSearch = function() {
          element(by.id("btn-submit")).click();
     };


};

module.exports = Search;