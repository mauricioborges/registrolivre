package functional.pageObject;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CompanyListPageObject {
    protected WebDriver driver;

    public CompanyListPageObject(WebDriver driver) {
        super();
        this.driver = driver;
    }


    public String getCompanyFromTable(){
        return driver.findElement(By.cssSelector(".text-left > span")).getText();
    }



}


