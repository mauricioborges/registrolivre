CREATE TABLE IF NOT EXISTS companies (
  id   SERIAL PRIMARY KEY,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  trade_name VARCHAR(150)
);

INSERT INTO companies VALUES (1, '40.573.872/0001-63', 'Marcenaria Tio Zé');
INSERT INTO companies VALUES (2, '40.573.872/0001-60', 'Marcenaria Tio João');

CREATE SEQUENCE hibernate_sequence INCREMENT BY 1 START WITH 3;

