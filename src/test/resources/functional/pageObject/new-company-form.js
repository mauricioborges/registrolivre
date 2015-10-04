var NewCompanyForm = (function () {
    function NewCompanyForm(){}

    NewCompanyForm.prototype.fillFields = function(cnpj, tradeName, pdf) {
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

    NewCompanyForm.prototype.submit = function(){
          element(by.id('btn-submit')).click();
    };

    NewCompanyForm.prototype.fillPartnerFields = function(partnerName,cpf){
        element(by.id('add-partners')).click();
        element(by.id('partnerName')).sendKeys(partnerName);
        element(by.id('cpf')).sendKeys(cpf);

    };

    NewCompanyForm.prototype.clear = function(){
          element(by.id('btn-clear')).click();
    };

    NewCompanyForm.prototype.setFile = function(pdf){
        var uploader = element(by.id('files'));

        browser.executeScript('document.getElementById("files").className = ""');

        uploader.sendKeys(pdf);
    };

    NewCompanyForm.prototype.uploadDocument = function(pdf){
          var verifyButton = element(by.id('verify'));

          NewCompanyForm.prototype.setFile(pdf);

          browser.driver.wait(function () {
                                          return verifyButton.isDisplayed();
                                      }, 5000);
    };

    NewCompanyForm.prototype.getProgressBarText = function(){
          return element(by.id('progressBar')).getText();
    };

    NewCompanyForm.prototype.isSaved = function(){
          browser.sleep(10000);
          browser.driver.wait(function () {
                                    return element(by.css('.alert-success')).isDisplayed();
                                }, 5000);
          return element(by.css('.alert-success')).getText();
    };

    NewCompanyForm.prototype.isSubmitButtonEnable = function(){
        return element(by.id('btn-submit')).isEnabled();
    };

    NewCompanyForm.prototype.CNPJExists = function(){
        browser.driver.wait(function () {
                                            return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
                                        }, 5000);
        return element(by.cssContainingText('.control-label', 'Já existe empresa com esse CNPJ')).isDisplayed();
    };

    NewCompanyForm.prototype.isCNPJValid = function(){
        browser.driver.wait(function () {
                                            return element(by.cssContainingText('.control-label', 'Número inválido')).isDisplayed();
                                        }, 5000);
        return element(by.cssContainingText('.control-label', 'Número inválido')).isDisplayed() === false;
    };

    NewCompanyForm.prototype.isPDFValid = function(){
        browser.driver.wait(function () {
                                            return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed();
                                        }, 5000);
        return element(by.cssContainingText('.control-label', 'Tamanho do arquivo não suportado')).isDisplayed() === false;
    };

    return NewCompanyForm;

})();

module.exports = NewCompanyForm;