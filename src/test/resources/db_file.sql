CREATE TABLE IF NOT EXISTS companies (
  id   SERIAL PRIMARY KEY,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  trade_name VARCHAR(150),
  company_name VARCHAR(150) DEFAULT NULL,
  street_name VARCHAR(255) DEFAULT NULL,
  number VARCHAR(255) DEFAULT NULL,
  complement VARCHAR(255) DEFAULT NULL,
  state VARCHAR(255) DEFAULT NULL,
  city VARCHAR(255) DEFAULT NULL,
  cep VARCHAR(9) DEFAULT NULL,
  opening_date DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS documents (
    id   SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    url VARCHAR(500),
    issue_date DATE
);

INSERT INTO companies VALUES (1, '40.573.872/0001-63', 'Marcenaria Tio Zé', 'Marcenaria LTDA Brasil', null, null, null, null, null, null, null);
INSERT INTO companies VALUES (2, '40.573.872/0001-60', 'Marcenaria Tio João', 'Marcenaria LTDA Argentina', null, null, null, null, null, null, null);

CREATE SEQUENCE hibernate_sequence INCREMENT 1 START 3;

