DROP TABLE IF EXISTS address;
ALTER TABLE companies ADD COLUMN street_name varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN number varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN complement varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN state varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN city varchar(255) DEFAULT NULL;
ALTER TABLE companies ADD COLUMN cep varchar(255) DEFAULT NULL;