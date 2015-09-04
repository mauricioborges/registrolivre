package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class CompanyTest {

    private static final String CNPJ = "1234567";
    private static final String TRADE_NAME = "fancy name";

    @Test
    public void shouldConvertRepresentationToCompany() throws Exception {
        CompanyRepresentation representation = new CompanyRepresentation(CNPJ, TRADE_NAME);
        Company company = new Company.Builder().toModel(representation);

        assertThat(company.getCnpj(), is(representation.getCnpj()));
        assertThat(company.getTradeName(), is(representation.getTradeName()));
    }

    @Test
    public void shouldConvertRepresentationWithAddressToCompany() throws Exception {
        MultipartFile multipartFile = null;
        Set<DocumentRepresentation> documents = new HashSet<>();
        CompanyRepresentation representation = new CompanyRepresentation(1L, CNPJ, TRADE_NAME, "COMPANY_NAME",
                "STREET_NAME", "NUMBER", "COMPLEMENT", "STATE", "CITY", "CEP", documents, multipartFile);
        Company company = new Company.Builder().toModel(representation);

        assertThat(company.getCompanyName(), is(representation.getCompanyName()));
        assertThat(company.getStreetName(), is(representation.getStreetName()));
        assertThat(company.getNumber(), is(representation.getNumber()));
        assertThat(company.getComplement(), is(representation.getComplement()));
        assertThat(company.getState(), is(representation.getState()));
        assertThat(company.getCity(), is(representation.getCity()));
        assertThat(company.getCep(), is(representation.getCep()));
    }
}
