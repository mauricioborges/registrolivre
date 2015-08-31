package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Address;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor
@AllArgsConstructor
@Value
@Wither
@FieldDefaults(level = PRIVATE)
public class AddressRepresentation {

    @JsonFormat Long id;
    @JsonFormat CompanyRepresentation company;
    @JsonFormat String streetName;
    @JsonFormat String number;
    @JsonFormat String complement;
    @JsonFormat String state;
    @JsonFormat String city;
    @JsonFormat String cep;



    public static class Builder {
        Long id;
        CompanyRepresentation company;
        String streetName;
        String number;
        String complement;
        String state;
        String city;
        String cep;

        public AddressRepresentation build() {
            return new AddressRepresentation();
        }

        public AddressRepresentation toRepresentation(Address address) {
            return new AddressRepresentation()
                    .withId(address.getId())
                    .withStreetName(address.getStreetName())
                    .withNumber(address.getNumber())
                    .withComplement(address.getComplement())
                    .withState(address.getState())
                    .withCity(address.getCity())
                    .withCep(address.getCep());
        }
    }
}
