package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.AddressRepresentation;
import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class AddressTest {
    @Test
    public void shouldConvertFromRepresentationToAddress() throws Exception {
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder()
                .withId(1L)
                .withCnpj("cnpj")
                .withTradeName("trade name")
                .build();

        AddressRepresentation addressRepresentation = new AddressRepresentation(1L, companyRepresentation, "STREET_NAME", "NUMBER", "COMPLEMENT", "STATE", "CITY", "CEP");
        Address address = new Address.Builder().toModel(addressRepresentation);

        assertThat(address.getStreetName(), is(addressRepresentation.getStreetName()));
        assertThat(address.getId(), is(addressRepresentation.getId()));
        assertThat(address.getCompany().getCnpj(), is(addressRepresentation.getCompany().getCnpj()));
        assertThat(address.getNumber(), is(addressRepresentation.getNumber()));
        assertThat(address.getComplement(), is(addressRepresentation.getComplement()));
        assertThat(address.getState(), is(addressRepresentation.getState()));
        assertThat(address.getCity(), is(addressRepresentation.getCity()));
        assertThat(address.getCep(), is(addressRepresentation.getCep()));
    }
}