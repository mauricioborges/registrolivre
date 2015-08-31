package utils;

import br.com.registrolivre.Application;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class,H2DataSourceConfiguration.class})
@WebIntegrationTest("server.port=9000")
public class InMemoryTestBase {
}
