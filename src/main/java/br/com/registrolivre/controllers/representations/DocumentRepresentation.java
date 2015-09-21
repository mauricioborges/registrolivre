package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Document;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import java.time.LocalDate;

import static lombok.AccessLevel.*;

@NoArgsConstructor
@AllArgsConstructor
@Value
@Wither
@FieldDefaults(level = PRIVATE)
public class DocumentRepresentation {
    @JsonFormat Long id;
    @JsonFormat CompanyRepresentation company;
    @JsonFormat String url;
    @JsonFormat String issueDate;

    public DocumentRepresentation(CompanyRepresentation company, String url, String issueDate) {
        this.company = company;
        this.url = url;
        this.issueDate = issueDate;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Value
    @Wither
    @FieldDefaults(level = PRIVATE)
    public static class Builder {

        Long id;
        CompanyRepresentation company;
        String url;
        String issueDate;

        public DocumentRepresentation build() {
            return new DocumentRepresentation(null, null, null, null);
        }

        public DocumentRepresentation toRepresentation(Document document) {
            String dateString = document.getIssueDate() != null
                    ? getStringDate(document.getIssueDate())
                    : null;
            return new DocumentRepresentation()
                    .withId(document.getId())
                    .withUrl(document.getUrl())
                    .withIssueDate(dateString);
        }

        private String getStringDate(LocalDate issueDate) {
            return String.format("%02d", issueDate.getDayOfMonth()) + "/" + String.format("%02d", issueDate.getMonthValue()) + "/" + String.format("%02d", issueDate.getYear());
        }
    }
}
