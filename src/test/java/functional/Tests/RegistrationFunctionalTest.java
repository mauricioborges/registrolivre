package functional.Tests;

import br.com.registrolivre.Application;
import functional.pageObject.NewCompanyPageObject;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import utils.H2DataSourceConfiguration;

import java.util.concurrent.TimeUnit;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, H2DataSourceConfiguration.class})
@WebIntegrationTest("server.port=9000")
public class RegistrationFunctionalTest {

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


