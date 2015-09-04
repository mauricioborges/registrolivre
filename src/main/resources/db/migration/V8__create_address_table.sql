CREATE TABLE IF NOT EXISTS address (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    street_name VARCHAR(255),
    number VARCHAR(255),
    complement VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    cep VARCHAR(9)
)
