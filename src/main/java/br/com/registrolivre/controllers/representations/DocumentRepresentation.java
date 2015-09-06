package br.com.registrolivre.controllers.representations;

import br.com.registrolivre.models.Document;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;
import java.util.Date;


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
    @JsonFormat Date issue_date;

    public DocumentRepresentation(CompanyRepresentation company, String url, Date issue_date) {
        this.company = company;
        this.url = url;
        this.issue_date = issue_date;
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
        Date issue_date;

        public DocumentRepresentation build() {
            return new DocumentRepresentation(null, null, null, null);
        }

        public DocumentRepresentation toRepresentation(Document document) {
            return new DocumentRepresentation()
                    .withId(document.getId())
                    .withUrl(document.getUrl())
                    .withIssue_date(document.getIssue_date());
        }
    }
}
