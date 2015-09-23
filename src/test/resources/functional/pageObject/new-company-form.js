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
          browser.executeScript('document.getElementById("files").className = ""');
          element(by.id('files')).sendKeys(pdf);
    }

    NewCompanyForm.prototype.getProgressBarText = function(){
          return element(by.id('progressBar')).getText();
    }

    return NewCompanyForm;

})();

module.exports = NewCompanyForm;