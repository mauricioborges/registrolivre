DROP TABLE IF EXISTS address;
ALTER TABLE companies ADD COLUMN street_name varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN number varchar(10) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN complement varchar(20) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN state varchar(2) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN city varchar(60) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN cep varchar(9) DEFAULT NULL;