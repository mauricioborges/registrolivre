package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
public class Company {

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company", fetch = FetchType.EAGER)
    Set<Document> documents = new HashSet<>();

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
        Set<Document> documents;

        public Company build() {
            return new Company();
        }

        public Company toModel(CompanyRepresentation representation) {
            Set<DocumentRepresentation> documentsRepresentation = representation.getDocuments();
            Company company = new Company()
                    .withId(representation.getId())
                    .withCnpj(representation.getCnpj())
                    .withTradeName(representation.getTradeName())
                    .withCompanyName(representation.getCompanyName());
            Set<Document> documents = documentsRepresentation != null
                    ? documentsToModel(documentsRepresentation, company)
                    : new HashSet<>();
            documents.forEach(doc -> company.documents.add(doc));
            return company;
        }

        private Set<Document> documentsToModel(Set<DocumentRepresentation> documents, Company company) {
            return documents.stream()
                    .map(document -> new Document.Builder().toModel(document).withCompany(company))
                    .collect(Collectors.toSet());
        }

        public void setAddress(Address address){

        }
    }
}
