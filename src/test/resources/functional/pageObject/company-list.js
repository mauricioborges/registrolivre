var CompanyList = function () {

    this.containsCompanyName = function(name) {
        return element.all(by.cssContainingText(".text-left > span", name)).first().getText().then(function(_name){
            return name === _name;
        });
    };
};

module.exports = CompanyList;