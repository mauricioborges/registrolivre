var CompanyList = function () {

    this.containsCompanyName = function(name) {
        return element.all(by.cssContainingText('.text-left > p', name)).first().getText().then(function(_name){
            return name === _name;
        });
    };

    this.clickCompanyName = function(name){
        element.all(by.css('[ng-click="showCompanyDetail(company)"]')).first().click();
    };
};

module.exports = CompanyList;