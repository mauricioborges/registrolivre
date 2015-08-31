package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.AddressRepresentation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.persistence.*;

import static lombok.AccessLevel.PRIVATE;

@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Value
@Wither
public class Address {

    @Id
    @GeneratedValue
    @Column(name = "id")
    Long id;

    @OneToOne
    @PrimaryKeyJoinColumn
    Company company;

    @Column(name = "street_name")
    String streetName;

    @Column(name = "number")
    String number;

    @Column(name = "complement")
    String complement;

    @Column(name = "state")
    String state;

    @Column(name = "city")
    String city;

    @Column(name = "cep")
    String cep;

    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder {
        Long id;
        Company company;
        String streetName;
        String number;
        String complement;
        String state;
        String city;
        String cep;

        public Address build() {
            return new Address();
        }
        public Address toModel(AddressRepresentation addressRepresentation) {
            return new Address()
                    .withId(addressRepresentation.getId())
                    .withCompany(new Company.Builder().toModel(addressRepresentation.getCompany()))
                    .withStreetName(addressRepresentation.getStreetName())
                    .withNumber(addressRepresentation.getNumber())
                    .withComplement(addressRepresentation.getComplement())
                    .withState(addressRepresentation.getState())
                    .withCity(addressRepresentation.getCity())
                    .withCep(addressRepresentation.getCep());
        }
    }
}
