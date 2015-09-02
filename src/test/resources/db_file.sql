CREATE TABLE IF NOT EXISTS companies (
  id   SERIAL PRIMARY KEY,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  trade_name VARCHAR(150),
  company_name varchar(150) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS documents (
    id   SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    url VARCHAR(500)
);

CREATE SEQUENCE hibernate_sequence INCREMENT 1 START 1;