package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.persistence.*;

import java.util.Date;

import static lombok.AccessLevel.PRIVATE;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "documents")
@FieldDefaults(level = PRIVATE)
@Entity
@Value
@Wither
@EqualsAndHashCode(exclude = "company")
@ToString(exclude = "company")
public class Document {

    public Document(Company company, String url, Date issue_date) {
        this.company = company;
        this.url = url;
        this.issue_date = issue_date;
    }

    @Id
    @GeneratedValue
    @Column(name = "id")
    Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    Company company;

    @Column(name = "url")
    String url;

    @Column(name = "issue_date")
    Date issue_date;

    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder {
        Long id;
        Company company;
        String url;
        Date issue_date;

        public Document build() {
            return new Document();
        }

        public Document toModel(DocumentRepresentation representation) {
            return new Document()
                    .withId(representation.getId())
                    .withUrl(representation.getUrl())
                    .withIssue_date(representation.getIssue_date());
        }
    }
}
