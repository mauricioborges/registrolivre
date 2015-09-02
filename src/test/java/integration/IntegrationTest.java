package integration;

import br.com.registrolivre.controllers.CompaniesController;
import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.repository.CompanyRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import utils.InMemoryTestBase;
import static org.junit.Assert.assertEquals;

public class IntegrationTest extends InMemoryTestBase {

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
