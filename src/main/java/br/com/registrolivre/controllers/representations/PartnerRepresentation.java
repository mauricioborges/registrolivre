package br.com.registrolivre.controllers.representations;


import br.com.registrolivre.models.Partner;
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
public class PartnerRepresentation {

    @JsonFormat Long id;
    @JsonFormat String name;
    @JsonFormat String cpf;
    @JsonFormat boolean isActive;
    @JsonFormat CompanyRepresentation company;


    public PartnerRepresentation(String name, String cpf, boolean isActive){
        this.name = name;
        this.cpf = cpf;
        this.isActive = isActive;
    }


    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder{
        Long id;
        String name;
        String cpf;
        boolean isActive;
        CompanyRepresentation company;


        public PartnerRepresentation build(){ return new PartnerRepresentation(); }

        public PartnerRepresentation toRepresentation(Partner partner){
            return new PartnerRepresentation()
                    .withId(partner.getId())
                    .withName(partner.getName())
                    .withCpf(partner.getCpf())
                    .withActive(partner.isActive());
        }
    }
}
