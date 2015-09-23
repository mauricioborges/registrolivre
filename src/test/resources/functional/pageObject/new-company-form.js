var NewCompanyForm = (function () {
    function NewCompanyForm(){}

    NewCompanyForm.prototype.fillFields = function(cnpj, tradeName, pdf) {
          this.uploadDocument(pdf);
          element(by.id('cnpj')).sendKeys(cnpj);
          element(by.id('nomeFantasia')).sendKeys(tradeName);
          element(by.id('razaoSocial')).sendKeys('Gama Company');
          element(by.id('nomeEndereco')).sendKeys('Rua Avelino Nascimento');
          element(by.id('nomeNumero')).sendKeys('222');
          element(by.id('nomeComplemento')).sendKeys('apart 107');
          element(by.css('#nomeUF-group select')).element(by.cssContainingText('option', 'MG')).click();
          element(by.css('#nomeCidade-group select')).element(by.cssContainingText('option', 'Almenara')).click();
          element(by.id('nomeCEP')).sendKeys('39900-000');
          element(by.id('nomeDataDeAbertura')).sendKeys('10/10/2009');
          element(by.id('nomeDataDoDocumento')).sendKeys('10/10/2010');
    };

    NewCompanyForm.prototype.submit = function(){
          element(by.id('btn-submit')).click();
    };

    NewCompanyForm.prototype.clear = function(){
          element(by.id('btn-clear')).click();
    };

    NewCompanyForm.prototype.uploadDocument = function(pdf){
          var uploader = element(by.id('files')),
              verificarButton = element(by.id('verificar'));

          browser.executeScript('document.getElementById("files").className = ""');

          uploader.sendKeys(pdf);

          browser.driver.wait(function () {
                                          return verificarButton.isDisplayed();
                                      }, 5000);
    }

    NewCompanyForm.prototype.getProgressBarText = function(){
          return element(by.id('progressBar')).getText();
    }

    NewCompanyForm.prototype.isSaved = function(){
          browser.sleep(10000);
          browser.driver.wait(function () {
                                    return element(by.css('.alert-success')).isDisplayed();
                                }, 5000);
          return element(by.css('.alert-success')).getText();
    }

    return NewCompanyForm;

})();

module.exports = NewCompanyForm;