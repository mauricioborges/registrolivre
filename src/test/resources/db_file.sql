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

CREATE TABLE IF NOT EXISTS address (
    id   SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    street_name VARCHAR(255),
    number INT,
    complement VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    cep VARCHAR(9)
);

INSERT INTO companies VALUES (1, '40.573.872/0001-63', 'Marcenaria Tio Zé', 'Marcenaria LTDA Brasil');
INSERT INTO companies VALUES (2, '40.573.872/0001-60', 'Marcenaria Tio João', 'Marcenaria LTDA Argentina');

CREATE SEQUENCE hibernate_sequence INCREMENT 1 START 3;

