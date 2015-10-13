package br.com.registrolivre.repository;

import br.com.registrolivre.models.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
    Company getByCnpj(String cnpj);

    @Query("select company from Company company where company.tradeName like %:tradeName%")
    List<Company> getByTradeName(@Param("tradeName") String tradeName);
}
