package functional.Tests;

import br.com.registrolivre.utils.DatabaseEnvironmentVariables;
import com.thoughtworks.selenium.webdriven.commands.RunScript;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class H2DataSourceConfiguration {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).addScript("classpath:db_file.sql").build();
    }
}
