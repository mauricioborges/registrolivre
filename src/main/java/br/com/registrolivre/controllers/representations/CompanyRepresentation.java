package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Company;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@NoArgsConstructor
@AllArgsConstructor
@Value
@Wither
@FieldDefaults(level = PRIVATE)
public class CompanyRepresentation {

    @JsonFormat Long id;
    @JsonFormat String cnpj;
    @JsonFormat String tradeName;
    @JsonFormat String companyName;
    @JsonFormat String streetName;
    @JsonFormat String number;
    @JsonFormat String complement;
    @JsonFormat String state;
    @JsonFormat String city;
    @JsonFormat String cep;
    @JsonFormat LocalDate openingDate;
    @JsonFormat Set<DocumentRepresentation> documents;
    @JsonFormat MultipartFile file;

    public CompanyRepresentation(String cnpj, String tradeName) {
        this.cnpj = cnpj;
        this.tradeName = tradeName;
        this.documents = new HashSet<>();
    }

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
        Set<DocumentRepresentation> documents;
        MultipartFile file;


        public CompanyRepresentation build() {
            return new CompanyRepresentation();
        }

        public CompanyRepresentation toRepresentation(Company company) {
            Set<DocumentRepresentation> documents = company.getDocuments().stream()
                    .map(document -> new DocumentRepresentation.Builder().toRepresentation(document))
                    .collect(Collectors.toSet());
            return new CompanyRepresentation()
                    .withId(company.getId())
                    .withCnpj(company.getCnpj())
                    .withTradeName(company.getTradeName())
                    .withCompanyName(company.getCompanyName())
                    .withDocuments(documents)
                    .withStreetName(company.getStreetName())
                    .withNumber(company.getNumber())
                    .withComplement(company.getComplement())
                    .withState(company.getState())
                    .withCity(company.getCity())
                    .withCep(company.getCep())
                    .withOpeningDate(company.getOpeningDate());

        }
    }
}
