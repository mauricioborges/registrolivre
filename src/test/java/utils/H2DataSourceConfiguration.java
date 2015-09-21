package utils;

        import org.flywaydb.core.Flyway;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
        import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
        import javax.sql.DataSource;
        import java.net.URISyntaxException;

@Configuration
public class H2DataSourceConfiguration {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).addScript("classpath:db_file.sql").build();
    }

    @Bean(initMethod = "migrate")
    public Flyway flyway(DataSource dataSource) throws URISyntaxException {
        Flyway flyway = new Flyway();
        flyway.setDataSource(dataSource);
        flyway.setBaselineOnMigrate(true);
        return flyway;
    }
}
