package functional.Tests;

import functional.pageObject.NewCompanyPageObject;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import utils.InMemoryTestBase;

import java.util.concurrent.TimeUnit;

public class RegistrationFunctionalTest extends InMemoryTestBase {
    static WebDriver driver;
    private NewCompanyPageObject newCompanyPageObject;

    @Before
    public void setUp() throws Exception {
        driver = new FirefoxDriver();
        newCompanyPageObject = new NewCompanyPageObject(driver);
        driver.get("http://localhost:9000/#");
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        driver.manage().window().maximize();
    }

    @Test
    public void shouldCreateNewCompany() throws InterruptedException {
        Assert.assertEquals(newCompanyPageObject.fillFormtoCreateANewCompany(), "Gama Company LTDA2");
    }

    @Test
    public void shouldCleanForm() throws InterruptedException {

        newCompanyPageObject.visit();
        newCompanyPageObject.fillInCnpj("57.739.236/0001-61");
        newCompanyPageObject.fillInName("Gama Company LTDA2");
        newCompanyPageObject.fillInSocialReason("Gama Company");
        newCompanyPageObject.fillInAddress("Rua Avelino Nascimento");
        newCompanyPageObject.fillInNumber("222");
        newCompanyPageObject.fillInComplement("apart 107");
        newCompanyPageObject.fillInState("MG");
        newCompanyPageObject.fillInCity("Almenara");
        newCompanyPageObject.fillInZipCode("39900-000");
        newCompanyPageObject.clearForm();
        Assert.assertEquals(newCompanyPageObject.getCnpj(), "");
        Assert.assertEquals(newCompanyPageObject.getName(), "");
        Assert.assertEquals(newCompanyPageObject.getSocialReason(), "");
        Assert.assertEquals(newCompanyPageObject.getAddress(), "");
        Assert.assertEquals(newCompanyPageObject.getNumber(), "");
        Assert.assertEquals(newCompanyPageObject.getComplement(), "");
        Assert.assertEquals(newCompanyPageObject.getState(), "");
        Assert.assertEquals(newCompanyPageObject.getCity(),"");
        Assert.assertEquals(newCompanyPageObject.getZipCode(),"");
    }

    @After
    public void tearDown() throws Exception {
        driver.quit();
    }
}


