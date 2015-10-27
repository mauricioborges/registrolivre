var NewCompanyForm = function () {

    this.fillFields = function(cnpj, tradeName, pdf) {
          this.uploadDocument(pdf);
          element(by.id('cnpj')).sendKeys(cnpj);
          element(by.id('tradeName')).sendKeys(tradeName);
          element(by.id('name')).sendKeys('Gama Company');
          element(by.id('address')).sendKeys('Rua Avelino Nascimento');
          element(by.id('number')).sendKeys('222');
          element(by.id('complement')).sendKeys('apart 107');
          element(by.css('#state-group select')).element(by.cssContainingText('option', 'MG')).click();
          element(by.css('#city-group select')).element(by.cssContainingText('option', 'Almenara')).click();
          element(by.id('zip')).sendKeys('39900-000');
          element(by.id('openingDate')).sendKeys('10/10/2009');
          element(by.id('issueDate')).sendKeys('10/10/2010');
    };

    this.submit = function(){
          element(by.id('btn-submit')).click();
    };

    this.addNewPartner = function(){
        element(by.id('add-partners')).click();
    };

    this.fillPartnerName = function(partnerName){
        element(by.id('partnerName')).sendKeys(partnerName);
    };

    this.fillPartnerCPF = function(cpf){
        element(by.id('cpf')).sendKeys(cpf);
        browser.executeScript('document.getElementById("cpf").blur()');
    };

    this.fillInvalidCNPJ = function(cnpj){
        element(by.id('cnpj')).sendKeys(cnpj);
        browser.executeScript('document.getElementById("cnpj").blur()');
    };

    this.clear = function(){
          element(by.id('btn-clear')).click();
    };

    this.setFile = function(pdf){
        var uploader = element(by.id('files'));

        browser.executeScript('document.getElementById("files").className = ""');

        uploader.sendKeys(pdf);
    };

    this.uploadDocument = function(pdf){
          var verifyButton = element(by.id('verify'));
          this.setFile(pdf);

          browser.driver.wait(function () {
               return verifyButton.isDisplayed();
          }, 5000);
    };

    this.getProgressBarText = function(){
          return element(by.id('progressBar')).getText();
    };

    this.isSaved = function(){
          browser.sleep(10000);
          browser.driver.wait(function () {
                return element(by.css('.alert-success')).isDisplayed();
          }, 5000);

          return element(by.css('.alert-success')).getText();
    };

    this.isSubmitButtonEnable = function(){
        return element(by.id('btn-submit')).isEnabled();
    };


    this.CNPJExists = function(){
        browser.driver.wait(function () {
              return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
        }, 5000);
        return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
    };

    this.isPDFValid = function(){
        browser.driver.wait(function () {
              return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed();
        }, 5000);
        return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed() === false;
    };
};

module.exports = NewCompanyForm;