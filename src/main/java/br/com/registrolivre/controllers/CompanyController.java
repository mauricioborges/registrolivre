package br.com.registrolivre.controllers;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.controllers.representations.FileUploaderOptions;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.services.AWSService;
import br.com.registrolivre.services.CompanyService;
import br.com.registrolivre.utils.AWSEnviromentVariables;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Optional;
import java.util.Set;

import static javax.validation.Validation.buildDefaultValidatorFactory;
import static lombok.AccessLevel.PRIVATE;
import static org.springframework.http.HttpStatus.*;

@Log4j
@NoArgsConstructor
@RestController
@FieldDefaults(level = PRIVATE)
public class CompanyController {

    CompanyService companyService;
    Validator validator;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
        validator = buildDefaultValidatorFactory().getValidator();
    }

    @RequestMapping(value = "/cadastro", method = RequestMethod.POST)
    public ResponseEntity save(@RequestBody CompanyRepresentation companyRepresentation) {
        try {
            Company company = new Company.Builder().toModel(companyRepresentation);
            Set<ConstraintViolation<Company>> violations = validator.validate(company);
            if (violations.isEmpty()) {
                companyService.save(company);
                return new ResponseEntity<>(OK);

            } else {
                log.error("Violations found: " + violations.toString());
                return new ResponseEntity<>(BAD_REQUEST);

            }
        } catch (IllegalArgumentException illegalArgumentException) {
            log.error("Could not save company - one or more arguments were null", illegalArgumentException);
            return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/buscar-por-cnpj", method = RequestMethod.GET)
    public ResponseEntity getCompanyByCnpj(@RequestParam String cnpj) {
        Optional<Company> company = Optional.ofNullable(companyService.getByCnpj(cnpj));
        if (!company.isPresent()) {
            return new ResponseEntity<>(NOT_FOUND);
        }
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder().toRepresentation(company.get());
        return ResponseEntity.ok(companyRepresentation);
    }

    @RequestMapping(value = "/get-file-uploader-options", method = RequestMethod.GET)
    public ResponseEntity getFileUploaderOptions() {
        try {
            FileUploaderOptions options = new FileUploaderOptions()
                    .withBucket(AWSService.BUCKET_NAME)
                    .withAwsRegion(AWSService.S3_REGION_NAME)
                    .withAwsKey(System.getenv(AWSEnviromentVariables.ACCESS_KEY_ID))
                    .withSignerUrl("/get-file-signature");
            return ResponseEntity.ok(options);
        } catch (Exception ex) {
            log.error("Could not get the file uploader options: ", ex);
            return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/get-file-signature", method = RequestMethod.GET)
    public ResponseEntity getFileSignature(@RequestParam String to_sign) {
        try {
            if (StringUtils.isEmpty(to_sign)) {
                return new ResponseEntity<>(BAD_REQUEST);
            } else {
                return ResponseEntity.ok(AWSService.calculateRFC2104HMAC(to_sign, System.getenv(AWSEnviromentVariables.SECRET_ACCESS_KEY)));
            }
        } catch (Exception ex) {
            log.error("Could not get the file signature: ", ex);
            return new ResponseEntity<>(INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/empresas/{companyId}", method = RequestMethod.GET)
    public ResponseEntity getCompanyById(@PathVariable long companyId) {
        Optional<Company> company = Optional.ofNullable(companyService.getById(companyId));
        if (!company.isPresent()) {
            return new ResponseEntity<>(NOT_FOUND);
        }
        CompanyRepresentation companyRepresentation = new CompanyRepresentation.Builder().toRepresentation(company.get());
        return ResponseEntity.ok(companyRepresentation);
    }
}
