package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Address;
import br.com.registrolivre.models.Company;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class AddressRepresentationTest {

    @Test
    public void shouldConvertAddressToRepresentation() {
        Address address = new Address(1L, new Company(), "STREET_NAME", "NUMBER", "COMPLEMENT", "STATE", "CITY", "CEP");

        AddressRepresentation addressRepresentation = new AddressRepresentation.Builder().toRepresentation(address);

        assertThat(addressRepresentation.getStreetName(), is(address.getStreetName()));
        assertThat(addressRepresentation.getId(), is(address.getId()));
        assertThat(addressRepresentation.getNumber(), is(address.getNumber()));
        assertThat(addressRepresentation.getComplement(), is(address.getComplement()));
        assertThat(addressRepresentation.getState(), is(address.getState()));
        assertThat(addressRepresentation.getCity(), is(address.getCity()));
        assertThat(addressRepresentation.getCep(), is(address.getCep()));
    }
}
