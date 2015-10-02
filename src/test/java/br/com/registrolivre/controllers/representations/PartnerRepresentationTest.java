package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Company;
import br.com.registrolivre.models.Document;
import br.com.registrolivre.models.Partner;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

/**
 * Created by psilva on 10/2/15.
 */
public class PartnerRepresentationTest {
    private Company company;

    @Before
    public void setUp() {
        company = new Company.Builder()
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();
    }

    @Test
    public void shouldConvertPartnerToRepresentation() throws Exception {

        Partner partner = new Partner(company, "Name Socio","100.000.000-10",true );
        PartnerRepresentation partnerRepresentation = new PartnerRepresentation.Builder()
                .toRepresentation(partner);

        assertThat(partnerRepresentation.getName(), is(partner.getName()));
        assertThat(partnerRepresentation.getCpf(), is(partner.getCpf()));
        assertThat(partnerRepresentation.isActive(), is(partner.isActive()));

    }
}