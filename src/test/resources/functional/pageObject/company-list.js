var CompanyList = (function () {
    function CompanyList(){}

    CompanyList.prototype.findCompanyName = function() {
          return element(by.css(".text-left > span")).getText();
    };

    return CompanyList;

})();

module.exports = CompanyList;