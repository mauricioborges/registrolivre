package integration;

import br.com.registrolivre.controllers.CompaniesController;
import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.models.Partner;
import br.com.registrolivre.repository.CompanyRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import utils.InMemoryTestBase;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


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
        LocalDate localDate = LocalDate.of(1991, 01, 11);
        Company company = new Company().withCnpj("68.966.372/0001-00").withTradeName("TradeName").withOpeningDate(localDate);
        Partner partner =new Partner().withName("pedro").withCpf("100.000.000-00").withActive(true);
        Set<Partner> partners = new HashSet<Partner>();
        partners.add(partner);
        company.withPartners(partners);
        repository.save(company);

        ResponseEntity<Iterable<CompanyRepresentation>> companies = controller.getCompanies();

        CompanyRepresentation next = companies.getBody().iterator().next();
        assertEquals(next.getTradeName(), "TradeName");
    }

    @Test
    public void shouldSearchANewCompany() throws Exception{
        LocalDate localDate = LocalDate.of(1991, 01, 11);
        Company company = new Company().withCnpj("68.966.372/0001-00").withTradeName("TradeName").withOpeningDate(localDate);
        repository.save(company);
        repository.findOne(company.getId());
        ResponseEntity<Iterable<CompanyRepresentation>> companies = controller.getCompanies();
        CompanyRepresentation next = companies.getBody().iterator().next();
        assertEquals(company.getCompanyName(),next.getCompanyName());
    }
}
