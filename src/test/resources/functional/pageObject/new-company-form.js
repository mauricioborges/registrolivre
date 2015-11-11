var NewCompanyForm = function () {

    this.fillFields = function(cnpj, tradeName, pdf, companyName, address, number, complement, state, city, zip, openingDate, issueDate) {
        this.uploadDocument(pdf);
        element(by.id('cnpj')).sendKeys(cnpj);
        element(by.id('tradeName')).sendKeys(tradeName);
        element(by.id('name')).sendKeys(companyName);
        element(by.id('address')).sendKeys(address);
        element(by.id('number')).sendKeys(number);
        element(by.id('complement')).sendKeys(complement);
        element(by.css('#state-group select')).element(by.cssContainingText('option', state || 'MG')).click();
        element(by.css('#city-group select')).element(by.cssContainingText('option', city || 'Almenara')).click();
        element(by.id('zip')).sendKeys(zip);
        element(by.id('openingDate')).sendKeys(openingDate);
        element(by.id('issueDate')).sendKeys(issueDate);
    };

    this.submit = function() {
        element(by.id('btn-submit')).click();
    };

    this.addNewPartner = function() {
        element(by.id('add-partners')).click();
    };

    this.fillPartnerName = function(partnerName) {
        element(by.id('partnerName')).sendKeys(partnerName);
    };

    this.fillPartnerCPF = function(cpf) {
        element(by.id('cpf')).sendKeys(cpf);
        browser.executeScript('document.getElementById("cpf").blur()');
    };

    this.fillInvalidCNPJ = function(cnpj) {
        element(by.id('cnpj')).sendKeys(cnpj);
        browser.executeScript('document.getElementById("cnpj").blur()');
    };

    this.fillInvalidOpeningDate = function(invalidDate) {
        element(by.id('openingDate')).sendKeys(invalidDate);
        browser.executeScript('document.getElementById("openingDate").blur()');
    };

    this.fillInvalidDocumentIssuanceDate = function(invalidDate) {
        element(by.id('issueDate')).sendKeys(invalidDate);
        browser.executeScript('document.getElementById("issueDate").blur()');
    };

    this.clear = function() {
        element(by.id('btn-clear')).click();
    };

    this.setFile = function(pdf) {
        var uploader = element(by.id('files'));

        browser.executeScript('document.getElementById("files").className = ""');

        uploader.sendKeys(pdf);
    };

    this.uploadDocument = function(pdf) {
        var verifyButton = element(by.id('verify'));
        this.setFile(pdf);

        browser.driver.wait(function() {
            return verifyButton.isDisplayed();
        }, 5000);
    };

    this.getProgressBarText = function() {
        return element(by.id('progressBar')).getText();
    };

    this.isSaved = function() {
        browser.sleep(10000);
        browser.driver.wait(function() {
            return element(by.css('.alert-success')).isDisplayed();
        }, 5000);

        return element(by.css('.alert-success')).getText();
    };

    this.isSubmitButtonEnable = function() {
        return element(by.id('btn-submit')).isEnabled();
    };

    this.CNPJExists = function() {
        browser.driver.wait(function() {
            return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
        }, 5000);
        return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
    };

    this.isPDFValid = function() {
        browser.driver.wait(function() {
            return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed();
        }, 5000);
        return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed() === false;
    };
};

module.exports = NewCompanyForm;