package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import br.com.registrolivre.controllers.representations.PartnerRepresentation;
import br.com.registrolivre.utils.LocalDatePersistenceConverter;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "companies")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Value
@Wither
@EqualsAndHashCode(exclude = "documents")
@ToString(exclude = "documents")
public class Company implements Serializable {

    public Company(String cnpj, String tradeName) {
        this.cnpj = cnpj;
        this.tradeName = tradeName;
    }

    @Id
    @GeneratedValue
    @Column(name = "id")
    Long id;

    @NotNull
    @CNPJ
    @Column(name = "cnpj")
    String cnpj;

    @NotNull
    @Column(name = "trade_name")
    String tradeName;

    @Column(name = "company_name")
    String companyName;

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

    @Convert(converter = LocalDatePersistenceConverter.class)
    @Column(name = "opening_date")
    LocalDate openingDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company", fetch = FetchType.EAGER)
    Set<Document> documents = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company", fetch = FetchType.EAGER)
    Set<Partner> partners = new HashSet<>();

    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder {
        Long id;
        String cnpj;
        String tradeName;
        String companyName;
        String streetName;
        String number;
        String complement;
        String state;
        String city;
        String cep;
        LocalDate openingDate;
        Set<Document> documents;
        Set<Partner> partners;


        public Company build() {
            return new Company();
        }

        public Company toModel(CompanyRepresentation representation) {
            Set<DocumentRepresentation> documentsRepresentation = representation.getDocuments();
            Set<PartnerRepresentation> partnersRepresentations = representation.getPartners();
            LocalDate companyDate = representation.getOpeningDate() != null
                ? LocalDatePersistenceConverter.getLocalDate(representation.getOpeningDate())
                : null;
            Company company = new Company()
                    .withId(representation.getId())
                    .withCnpj(representation.getCnpj())
                    .withTradeName(representation.getTradeName())
                    .withCompanyName(representation.getCompanyName())
                    .withStreetName(representation.getStreetName())
                    .withNumber(representation.getNumber())
                    .withComplement(representation.getComplement())
                    .withState(representation.getState())
                    .withCity(representation.getCity())
                    .withCep(representation.getCep())
                    .withOpeningDate(companyDate);
            Set<Document> documents = documentsRepresentation != null
                    ? documentsToModel(documentsRepresentation, company)
                    : new HashSet<>();
            documents.forEach(doc -> company.documents.add(doc));

            Set<Partner> partners = partnersRepresentations != null ? partnersToModel(partnersRepresentations,company) : new HashSet<>();
            partners.forEach(partner -> company.partners.add(partner));

            return company;
        }

        private Set<Document> documentsToModel(Set<DocumentRepresentation> documents, Company company) {
            return documents.stream()
                    .map(document -> new Document.Builder().toModel(document).withCompany(company))
                    .collect(Collectors.toSet());
        }

        private Set<Partner> partnersToModel(Set<PartnerRepresentation> partners, Company company){
            return partners.stream().map(partner -> new Partner.Builder().toModel(partner).withCompany(company)).collect(Collectors.toSet());
        }
    }
}
