package br.com.registrolivre.models;

import br.com.registrolivre.controllers.representations.DocumentRepresentation;
import br.com.registrolivre.utils.LocalDatePersistenceConverter;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import javax.persistence.*;

import java.time.LocalDate;

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

    public Document(Company company, String url, LocalDate issueDate) {
        this.company = company;
        this.url = url;
        this.issueDate = issueDate;
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

    @Convert(converter = LocalDatePersistenceConverter.class)
    @Column(name = "issue_date")
    LocalDate issueDate;

    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder {
        Long id;
        Company company;
        String url;
        LocalDate issueDate;

        public Document build() {
            return new Document();
        }

        public Document toModel(DocumentRepresentation representation) {
            LocalDate documentDate = representation.getIssueDate() != null
                    ? getLocalDate(representation.getIssueDate())
                    : null;
            return new Document()
                    .withId(representation.getId())
                    .withUrl(representation.getUrl())
                    .withIssueDate(documentDate);
        }

        private LocalDate getLocalDate(String issueDate) {
            String[] date = issueDate.split("/");
            int openingYear = Integer.parseInt(date[2]);
            int openingMonth = Integer.parseInt(date[1]);
            int openingDay = Integer.parseInt(date[0]);
            return LocalDate.of(openingYear, openingMonth, openingDay);
        }
    }
}
