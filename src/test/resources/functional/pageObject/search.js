var Search = (function () {
    function Search(){}

    Search.prototype.fillSearchField = function(company) {
          element(by.id("search-input")).sendKeys(company);
    };
     Search.prototype.submitSearch = function() {
          element(by.id("btn-submit")).click();
     };

    return Search;

})();

module.exports = Search;