var CompanyList = (function () {
    function CompanyList(){}

    CompanyList.prototype.findCompanyName = function(name) {
        return element.all(by.cssContainingText(".text-left > span", name)).first().getText();
    };

    return CompanyList;

})();

module.exports = CompanyList;