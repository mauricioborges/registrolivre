package functional.pageObject;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.net.URISyntaxException;

public class NewCompanyPageObject {
    protected WebDriver driver;
    private HeaderObject headerObject;
    private CompanyListPageObject companyListPageObject;


    public NewCompanyPageObject(WebDriver driver) {
        super();
        this.driver = driver;
        headerObject = new HeaderObject(driver);
        companyListPageObject = new CompanyListPageObject(driver);
    }

    public void fillInArquivo(String arquivo) throws URISyntaxException {
        ((JavascriptExecutor) driver).executeScript("document.getElementById('files').className = document.getElementById('files').className.replace(/\\bhidden\\b/,'');");
        File file = new File(NewCompanyPageObject.class.getClassLoader().getResource(arquivo).toURI());
        driver.findElement(By.id("files")).sendKeys(file.getAbsolutePath());
        WebDriverWait wait = new WebDriverWait(driver, 4);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("verificar")));
    }

    public void fillInCnpj(String cnpj) {
        driver.findElement(By.id("cnpj")).sendKeys(cnpj);
    }

    public void fillInName(String nomeFantasia) {
        driver.findElement(By.id("nomeFantasia")).sendKeys(nomeFantasia);
    }

    public void fillInSocialReason(String socialReason) {
        driver.findElement(By.id("razaoSocial")).sendKeys(socialReason);
    }

    public void fillInAddress(String nameAddress) {
        driver.findElement(By.id("nomeEndereco")).sendKeys(nameAddress);
    }

    public void fillInNumber(String number) {
        driver.findElement(By.id("nomeNumero")).sendKeys(number);
    }

    public void fillInComplement(String nameComplement) {
        driver.findElement(By.id("nomeComplemento")).sendKeys(nameComplement);
    }

    public void fillInState(String stateName) {
        Select dropdown = new Select(driver.findElement(By.cssSelector("#nomeUF-group select")));
        dropdown.selectByVisibleText(stateName);
    }

    public void fillInCity(String cityName) {
        Select dropdown = new Select(driver.findElement(By.cssSelector("#nomeCidade-group select")));
        dropdown.selectByVisibleText(cityName);
    }

    public void fillInZipCode(String zipCode) {
        driver.findElement(By.id("nomeCEP")).sendKeys(zipCode);
    }

    public void submitForm() {
        driver.findElement(By.id("btn-submit")).click();
    }

    public String verifyAlertMessage(){
        driver.findElement(By.xpath("/html/body/div/div[2]/div/div/div/div/div[1]/div")).isDisplayed();
        return driver.findElement(By.xpath("/html/body/div/div[2]/div/div/div/div/div[1]/div/strong")).getText();
    }

    public String fillFormtoCreateANewCompany() throws InterruptedException, URISyntaxException {

        headerObject.visitSignUpCompany();
        fillInArquivo("file_uploader_functional_test.pdf");
        fillInCnpj("57.739.236/0001-61");
        fillInName("Gama Company LTDA2");
        fillInSocialReason("Gama Company");
        fillInAddress("Rua Avelino Nascimento");
        fillInNumber("222");
        fillInComplement("apart 107");
        fillInState("MG");
        fillInCity("Almenara");
        fillInZipCode("39900-000");
        submitForm();

        verifyAlertMessage();

        headerObject.visitCompanyList();

        Thread.sleep(2000);
        return companyListPageObject.getCompanyFromTable();
    }

    public void fillFormToCreateANewCompanyAndCleanFields() throws URISyntaxException {
        headerObject.visitSignUpCompany();
        fillInArquivo("file_uploader_functional_test.pdf");
        fillInCnpj("57.739.236/0001-61");
        fillInName("Gama Company LTDA2");
        fillInSocialReason("Gama Company");
        fillInAddress("Rua Avelino Nascimento");
        fillInNumber("222");
        fillInComplement("apart 107");
        fillInState("MG");
        fillInCity("Almenara");
        fillInZipCode("39900-000");
        clearForm();
    }

    public void clearForm() {
        driver.findElement(By.id("btn-clear")).click();
    }

    public String getFile() {
        return driver.findElement(By.id("arquivo")).getAttribute("value") ;
    }

    public String getCnpj() {
        return driver.findElement(By.id("cnpj")).getAttribute("value") ;
    }

    public String getName() {
        return driver.findElement(By.id("nomeFantasia")).getAttribute("value");
    }

    public String getSocialReason() {
        return driver.findElement(By.id("razaoSocial")).getAttribute("value");
    }

    public String getAddress() {
        return driver.findElement(By.id("nomeEndereco")).getAttribute("value");
    }

    public String getNumber() {
        return driver.findElement(By.id("nomeNumero")).getAttribute("value");
    }

    public String getComplement() {
        return driver.findElement(By.id("nomeComplemento")).getAttribute("value");
    }

    public String getState() {
        Select dropdown = new Select(driver.findElement(By.cssSelector("#nomeUF-group select")));
        return dropdown.getFirstSelectedOption().getText();
    }

    public String getCity() {
        Select dropdown = new Select(driver.findElement(By.cssSelector("#nomeCidade-group select")));
        return dropdown.getFirstSelectedOption().getText();
    }

    public String getZipCode() {
        return driver.findElement(By.id("nomeCEP")).getAttribute("value");

    }
}
