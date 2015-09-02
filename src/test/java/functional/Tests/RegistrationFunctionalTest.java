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

    @After
    public void tearDown() throws Exception {
        driver.quit();
    }
}


