var CompanyList = (function () {
    function CompanyList(){}

    CompanyList.prototype.containsCompanyName = function(name) {

        return element.all(by.cssContainingText(".text-left > span", name)).first().getText().then(function(_name){
            return name === _name;
        });
    };

    return CompanyList;

})();

module.exports = CompanyList;