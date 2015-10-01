package br.com.registrolivre.utils;

import java.time.LocalDate;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply=true)
public class LocalDatePersistenceConverter implements AttributeConverter<LocalDate, java.sql.Date> {

    @Override
    public java.sql.Date convertToDatabaseColumn(LocalDate entityValue) {
        if (entityValue != null) {
            return java.sql.Date.valueOf(entityValue);
        }
        return null;
    }

    @Override
    public LocalDate convertToEntityAttribute(java.sql.Date databaseValue) {
        if (databaseValue != null) {
            return databaseValue.toLocalDate();
        }
        return null;
    }

    public static LocalDate getLocalDate(String issueDate) {
        if(issueDate == "") return null;
        String[] date = issueDate.split("/");
        int openingYear = Integer.parseInt(date[2]);
        int openingMonth = Integer.parseInt(date[1]);
        int openingDay = Integer.parseInt(date[0]);
        return LocalDate.of(openingYear, openingMonth, openingDay);
    }
}
