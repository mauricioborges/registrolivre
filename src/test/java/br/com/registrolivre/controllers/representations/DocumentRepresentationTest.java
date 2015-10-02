package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Company;
import br.com.registrolivre.models.Document;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class DocumentRepresentationTest {
    private Company company;
    private String url = "url";
    private LocalDate issue_date = LocalDate.of(2010,9,10);

    @Before
    public void setUp() {
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
