package functional.pageObject;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HeaderObject {
    protected WebDriver driver;

    public HeaderObject(WebDriver driver) {
        super();
        this.driver = driver;
    }

    public void visitHome(){
        driver.findElement(By.xpath("/html/body/div/div[1]/nav/div/div[1]/a/")).click();
    }

    public void visitSignUpCompany(){
        driver.findElement(By.cssSelector("div.collapse.navbar-mobile.in > ul > li:nth-child(2) > a")).click();
    }

    public void visitCompanyList(){
        driver.findElement(By.cssSelector("div.collapse.navbar-mobile.in > ul > li:nth-child(3) > a")).click();
    }

    public String getCurrentUrl(){
        String currentUrl = driver.getCurrentUrl();
        return currentUrl;
    }
}
