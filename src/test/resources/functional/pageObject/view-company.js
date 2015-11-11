var ViewCompany = function () {

    this.getDownload = function() {
        return element(by.css('.btn-download')).getText();
    };

    this.getCompanyCnpj = function() {
        return element(by.id('cnpj')).getText();
    };

    this.getCompanyName = function() {
        return element(by.id('companyName')).getText();
    };

    this.getTradeName = function() {
        return element(by.id('tradeName')).getText();
    };

    this.getStreetName = function() {
        return element(by.id('address')).getText();
    };

    this.getNumber = function() {
        return element(by.id('number')).getText();
    };

    this.getComplement = function() {
        return element(by.id('complement')).getText();
    };

    this.getCity = function() {
        return element(by.id('city')).getText();
    };

    this.getState = function() {
        return element(by.id('state')).getText();
    };
    this.getCep = function() {
        return element(by.id('zip')).getText();
    };

    this.getOpeningDate = function() {
        return element(by.id('openingDate')).getText();
    };

    this.getIssueDate = function() {
        return element(by.id('issueDate')).getText();
    };

    this.getPartnerName = function() {
        return element(by.css('.partnerName')).getText();
    };

    this.getPartnerCpf = function() {
        return element(by.css('.partnerCpf')).getText();
    };

    this.getActivePartner = function() {
         return element(by.css('.activePartner')).getText();
    };
};

module.exports = ViewCompany;