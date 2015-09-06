package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Company;
import br.com.registrolivre.models.Document;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class DocumentRepresentationTest {
    private CompanyRepresentation companyRepresentation;
    private Company company;
    private String url = "url";
    private Date issue_date = null;

    @Before
    public void setUp() {
        companyRepresentation = new CompanyRepresentation.Builder()
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();

        company = new Company.Builder()
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
    }

    @Test
    public void shouldConvertDocumentToRepresentation() throws Exception {
        Document document = new Document(company, url, issue_date);
        DocumentRepresentation documentRepresentation = new DocumentRepresentation.Builder()
                .toRepresentation(document);

        assertThat(documentRepresentation.getUrl(), is(document.getUrl()));
    }
}
