package integration;

import br.com.registrolivre.Application;
import br.com.registrolivre.controllers.CompaniesController;
import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.repository.CompanyRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import utils.H2DataSourceConfiguration;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class, H2DataSourceConfiguration.class})
@WebIntegrationTest("server.port=9000")
public class IntegrationTest {

    @Autowired
    CompaniesController controller;

    @Autowired
    CompanyRepository repository;

    @Before
    public void setUp(){
        repository.deleteAll();
    }

    @Test
    public void shouldCreateANewCompany() throws Exception {
        repository.save(new Company().withCnpj("68.966.372/0001-00").withTradeName("TradeName"));

        ResponseEntity<Iterable<CompanyRepresentation>> companies = controller.getCompanies();

        CompanyRepresentation next = companies.getBody().iterator().next();
        assertEquals(next.getTradeName(), "TradeName");
    }
}
