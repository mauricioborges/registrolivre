package br.com.registrolivre.services;

import br.com.registrolivre.models.Company;
import br.com.registrolivre.repository.CompanyRepository;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@FieldDefaults(level = PRIVATE)
@Component
public class CompanyService {

    CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public void save(Company company) {
        companyRepository.save(company);
    }

    public Iterable<Company> findAll() {
        return companyRepository.findAll();
    }

    public Company getByCnpj(String cnpj) {
        return companyRepository.getByCnpj(cnpj);
    }

    public Company getById(Long id) { return  companyRepository.findOne(id); }

    public List<Company> findByTradeName(String tradeName) { return companyRepository.getByTradeName(tradeName); }
}
