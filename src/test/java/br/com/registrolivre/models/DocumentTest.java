package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNull;

public class DocumentTest {
    private CompanyRepresentation companyRepresentation;
    private String issueDate = "10/10/2010";

    @Before
    public void setUp() {
        companyRepresentation = new CompanyRepresentation.Builder()
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
    }

    @Test
    public void shouldConvertRepresentationToDocument() throws Exception {
        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url",issueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);

        assertThat(document.getUrl(), is(documentRepresentation.getUrl()));
        assertThat(document.getIssueDate(), is(document.getIssueDate()));

    }

    @Test
    public void shouldReturnNullDateWhenIssueDateIsEmpty() throws Exception {
        String emptyIssueDate = "";
        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url", emptyIssueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);

        assertNull(document.getIssueDate()  );
    }

    @Test
    public void shouldReturnNullDateWhenIssueDateIsNull() throws Exception {
        String nullIssueDate = null;
        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url",nullIssueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);

        assertNull(document.getIssueDate());
    }
}
