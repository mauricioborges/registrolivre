CREATE TABLE IF NOT EXISTS companies (
  id   SERIAL PRIMARY KEY,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  trade_name VARCHAR(150),
  company_name VARCHAR(150) DEFAULT NULL,
  street_name varchar(255) DEFAULT NULL,
  number varchar(10) DEFAULT NULL,
  complement varchar(20) DEFAULT NULL,
  state varchar(2) DEFAULT NULL,
  city varchar(60) DEFAULT NULL,
  cep varchar(9) DEFAULT NULL,
  opening_date DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS documents (
  id   SERIAL PRIMARY KEY,
  company_id INT NOT NULL REFERENCES companies(id),
  url VARCHAR(500),
  issue_date DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS partners(
 id SERIAL PRIMARY KEY,
 company_id INT NOT NULL REFERENCES companies(id),
 name VARCHAR(150),
 cpf VARCHAR(14),
 is_active boolean
);