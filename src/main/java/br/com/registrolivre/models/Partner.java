package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.PartnerRepresentation;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "partners")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Value
@Wither
@EqualsAndHashCode(exclude = "company")
@ToString(exclude = "company")
public class Partner implements Serializable {

    @Id
    @GeneratedValue
    @Column( name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "cpf")
    String cpf;

    @org.hibernate.annotations.Type(type = "true_false")
    @Column(name = "is_active")
    boolean isActive;

    @ManyToOne(targetEntity = Company.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id", nullable = false)
    Company company;


    public Partner(Company company,String name, String cpf, boolean isActive){
        this.company = company;
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


        public Partner build(){ return new Partner(); }

        public Partner toModel(PartnerRepresentation representation){
            return new Partner()
                    .withId(representation.getId())
                    .withName(representation.getName())
                    .withCpf(representation.getCpf())
                    .withActive(representation.isActive());

        }
    }
}
