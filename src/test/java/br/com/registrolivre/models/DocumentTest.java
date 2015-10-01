package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNull;

public class DocumentTest {
    private String issueDate = "10/10/2010";

    @Test
    public void shouldConvertRepresentationToDocument() throws Exception {
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder()
                .withId(1L)
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();



        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url",issueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);

        assertThat(document.getUrl(), is(documentRepresentation.getUrl()));
    }

    @Test
    public void shouldReturnNullDateWhenIssueDateIsEmpty() throws Exception {
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder()
                .withId(1L)
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
        String emptyIssueDate = "";
        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url", emptyIssueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);
        assertNull(document.getIssueDate()  );
    }

    @Test
    public void shouldReturnNullDateWhenIssueDateIsNull() throws Exception {
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder()
                .withId(1L)
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
        String nullIssueDate = null;
        DocumentRepresentation documentRepresentation = new DocumentRepresentation(companyRepresentation, "url",nullIssueDate );
        Document document = new Document.Builder().toModel(documentRepresentation);
        assertNull(document.getIssueDate());
    }
}
