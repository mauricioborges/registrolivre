package br.com.registrolivre.controllers;

import br.com.registrolivre.controllers.representations.CompanyRepresentation;
import br.com.registrolivre.models.Company;
import br.com.registrolivre.services.CompanyService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class CompanyControllerTest {

    @Mock
    private CompanyService companyService;

    private CompanyRepresentation companyRepresentation;

    private CompanyController controller;

    private Company company;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        controller = new CompanyController(companyService);
        companyRepresentation = new CompanyRepresentation("79.064.650/0001-50", "fancy name");
        company = new Company.Builder().toModel(companyRepresentation);
    }

    @Test
    public void shouldCallRepository() throws Exception {
        controller.save(companyRepresentation);
        verify(companyService).save(company);
    }

    @Test
    public void shouldReturnOKIfSuccess() throws Exception {
        companyService.save(company);
        ResponseEntity response = controller.save(companyRepresentation);
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void shouldReturnInternalServerError() throws Exception {
        doThrow(IllegalArgumentException.class).when(companyService).save(company);
        ResponseEntity response = controller.save(companyRepresentation);
        assertThat(response.getStatusCode(), is(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Test
    public void shouldValidateCNPJ() throws Exception {
        companyRepresentation = new CompanyRepresentation("123 invalid cnpj", "another fancy name");
        controller.save(companyRepresentation);
        verifyZeroInteractions(companyService);
    }

    @Test
    public void shouldGetExistingCompanyByCNPJ() throws Exception {
        CompanyRepresentation company = new CompanyRepresentation("cnpj", "company");
        when(companyService.getByCnpj("cnpj")).thenReturn(new Company.Builder().toModel(company));
        ResponseEntity response = controller.getCompanyByCnpj("cnpj");
        assertThat(response.getBody(), is(company));
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void shouldGetExistingCompanyById() throws Exception {
        CompanyRepresentation company = new CompanyRepresentation("cnpj", "company", 1L);

        when(companyService.getById(1L)).thenReturn(new Company.Builder().toModel(company));

        ResponseEntity response = controller.getCompanyById(1L);
        assertThat(response.getBody(), is(company));
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    public void shouldGetNothingWhenGettingNonExistingCompanyByCNPJ() throws Exception {
        when(companyService.getByCnpj("cnpj")).thenReturn(null);
        ResponseEntity response = controller.getCompanyByCnpj("cnpj");
        assertEquals(response.getBody(), null);
        assertThat(response.getStatusCode(), is(HttpStatus.NOT_FOUND));

    }
}