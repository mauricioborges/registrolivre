package br.com.registrolivre.integration;

import br.com.registrolivre.controllers.CompaniesController;
import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.repository.CompanyRepository;
import functional.Tests.InMemoryTestBase;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import static org.junit.Assert.assertEquals;


public class IntegrationTest extends InMemoryTestBase {

    @Autowired
    CompaniesController controller;

    @Autowired
    CompanyRepository repository;

    @Test
    public void testName() throws Exception {
        repository.save(new Company().withCnpj("68.966.372/0001-00").withTradeName("TradeName"));

        ResponseEntity<Iterable<CompanyRepresentation>> companies = controller.getCompanies();

        CompanyRepresentation next = companies.getBody().iterator().next();
        assertEquals(next.getTradeName(), "TradeName");
    }
}
