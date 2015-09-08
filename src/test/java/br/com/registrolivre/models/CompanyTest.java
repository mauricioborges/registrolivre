package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class CompanyTest {

    private static final String CNPJ = "1234567";
    private static final String TRADE_NAME = "fancy name";
    private static final Set<DocumentRepresentation> DOCUMENTS = new HashSet<>();
    private static final String COMPANY_NAME = "Foobar";
    private static final String STREET_NAME = "";
    private static final String ADDRESS_NUMBER = "";
    private static final String COMPLEMENT = "";
    private static final String STATE = "";
    private static final String CITY = "";
    private static final String CEP = "";
    private static final LocalDate OPENING_DATE = LocalDate.of(2009, 03, 9);
    private static final MultipartFile FILE = null;

    @Test
    public void shouldConvertRepresentationToCompany() throws Exception {
        CompanyRepresentation representation = new CompanyRepresentation(CNPJ, TRADE_NAME);
        Company company = new Company.Builder().toModel(representation);

        assertThat(company.getCnpj(), is(representation.getCnpj()));
        assertThat(company.getTradeName(), is(representation.getTradeName()));
    }

    @Test
    public void shouldConvertRepresentationWithAddressToCompany() throws Exception {
        CompanyRepresentation representation = new CompanyRepresentation(1L, CNPJ, TRADE_NAME, COMPANY_NAME,
                STREET_NAME, ADDRESS_NUMBER, COMPLEMENT, STATE, CITY, CEP, OPENING_DATE, DOCUMENTS, FILE);
        Company company = new Company.Builder().toModel(representation);

        assertThat(company.getCnpj(), is(representation.getCnpj()));
        assertThat(company.getTradeName(), is(representation.getTradeName()));
        assertThat(company.getCompanyName(), is(representation.getCompanyName()));
        assertThat(company.getStreetName(), is(representation.getStreetName()));
        assertThat(company.getNumber(), is(representation.getNumber()));
        assertThat(company.getComplement(), is(representation.getComplement()));
        assertThat(company.getState(), is(representation.getState()));
        assertThat(company.getCity(), is(representation.getCity()));
        assertThat(company.getCep(), is(representation.getCep()));
        assertThat(company.getOpeningDate(), is(representation.getOpeningDate()));
    }
}
