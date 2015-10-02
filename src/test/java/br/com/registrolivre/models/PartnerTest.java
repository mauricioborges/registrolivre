package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import br.com.registrolivre.controllers.representations.PartnerRepresentation;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class PartnerTest {

    private CompanyRepresentation companyRepresentation;

    @Before
    public void setUp() {
        companyRepresentation = new CompanyRepresentation.Builder()
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
    }
    @Test
    public void shouldConvertRepresentationToPartner() throws Exception {
        PartnerRepresentation partnerRepresentation = new PartnerRepresentation(companyRepresentation, "Name Socio","100.000.000-10",true );
        Partner partner = new Partner.Builder().toModel(partnerRepresentation);

        assertThat(partner.getName(), is(partnerRepresentation.getName()));
        assertThat(partner.getCpf(), is(partnerRepresentation.getCpf()));
        assertThat(partner.isActive(), is(partnerRepresentation.isActive()));


    }
}