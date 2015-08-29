package functional.Tests;

import functional.pageObject.CompanyListPageObject;
import functional.pageObject.HeaderObject;
import functional.pageObject.NewCompanyPageObject;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.TimeUnit;


public class RegistrationFunctionTest extends InMemoryTestBase {
    static WebDriver driver;
    private NewCompanyPageObject newCompanyPageObject;
    private CompanyListPageObject companyListPageObject;
    private HeaderObject headerObject;

    @Before
    public void setUp() throws Exception {
        driver = new FirefoxDriver();
        newCompanyPageObject = new NewCompanyPageObject(driver);
        companyListPageObject = new CompanyListPageObject (driver);
        headerObject = new HeaderObject(driver);
        driver.get("http://localhost:9000/#");
        driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);

    }

    @Test
    public void shouldCreateNewCompany() {
        headerObject.visitCadastrarEmpresa();
        newCompanyPageObject.fillInCnpj("87.806.523/0001-08");
        newCompanyPageObject.fillInName("Gama Company LTDA2");
        newCompanyPageObject.fillInSocialReason("Gama Company");
        newCompanyPageObject.fillInAddress("Rua Avelino Nascimento");
        newCompanyPageObject.fillInNumber("222");
        newCompanyPageObject.fillInComplement("apart 107");
        newCompanyPageObject.fillInState("MG");
        newCompanyPageObject.fillInCity("Almenara");
        newCompanyPageObject.fillInZipCode("39900-000");
        newCompanyPageObject.submitForm();

        String verifyNomeFantasia = newCompanyPageObject.verifyAlertMessage();

        Assert.assertEquals(verifyNomeFantasia, "Gama Company LTDA2");

    }

    @After
    public void tearDown() throws Exception {
        driver.quit();
    }
}


