# Registro Livre

 O **Registro Livre** é uma plataforma de dados abertos cujo objetivo principal é colocar à disposição do público informações sobre empresas, imóveis e outros tipos de bens e atividades sujeitos a registro público no Brasil. Embora os dados disponíveis em cartórios e juntas comerciais sejam públicos, eles raramente são publicados. O cidadão que deseja ter acesso a contratos sociais e informações sobre propriedade de imóveis, por exemplo, precisa pagar taxas e aguardar vários dias para receber cópias de documentos. O Registro Livre vai reunir estes dados numa plataforma aberta, para a qual todo cidadão poderá contribuir. Desta forma, os registros públicos serão acessíveis a todos e tornados públicos de fato.

## Tecnologias e dependências
* Back-End:
  * [Java 8](http://docs.oracle.com/javase/8/)
  * [Spring MVC](https://spring.io/guides/gs/serving-web-content/)
  * [SpringBoot](http://projects.spring.io/spring-boot/)
  * [Hibernate](http://hibernate.org/)
  * [Lombok](https://projectlombok.org/)

* Front-End:
  * [Angular](https://angularjs.org/)
  * [Bootstrap3](http://getbootstrap.com/)
  * [Ramda](http://ramdajs.com/)

* Bancos de Dados:
  * [PostgreSQL](http://www.postgresql.org/)
  * [FlywayDB](http://flywaydb.org/)
  * [H2 Database](http://www.h2database.com/html/main.html)

* Ferramentas de Teste:
  * [JUnit](http://junit.org/)
  * [Mockito](http://mockito.org/)
  * [Hamcrest](https://code.google.com/p/hamcrest/wiki/Tutorial)
  * [Jasmine](http://jasmine.github.io/)
  * [Karma](http://karma-runner.github.io/)
  * [Sinon](http://sinonjs.org/)
  * [Chai](http://chaijs.com/)
  * [JSHint](http://jshint.com/)

* Ferramentas de Automação:
 * [Gradle](https://gradle.org/)
 * [Vagrant](https://www.vagrantup.com/)

* Pipeline:
 * [GO](http://www.go.cd/)

## Pré-requisitos para instalar a máquina virtual:
* ^ Virtual Box 5.0.4 r102546
* ^ Vagrant 1.7.3
* Java 1.8
* ^ NPM 2
* ^ Gradle 2.4

No Mac OS X, instalando somente o 'node', o npm já é incluso.

# Criar Máquina Virtual Local

O ambiente local para executar a aplicação é em uma máquina virtual.
Para criar a máquina virtual no ambiente local, execute o script abaixo:

```
$ ./gradlew createVirtualMachine
```

* Se é utilizada outra ferramenta de shell diferente de Bash, é necessário atualizar as váriaveis de ambiente com o comando:
$ source <RAIZ DO PROJETO>/.profile

## Deploy da aplicação no ambiente local

Para fazer o deploy da aplicação no ambiente local, antes você deve executar as tasks "bringUpLocalAppServer", "provisionLocalAppServer" e "createLocalDatabase"

A task para efetuar o deploy da aplicação:

```
$ ./gradlew deployLocalAppServer
```

## Wiki Registro Livre

Se você tem alguma dúvida sobre o projeto, não deixe de consultar nossa [Wiki](https://github.com/ThoughtWorksInc/registrolivre/wiki/Registro-Livre----OFFICIAL-WIKI)
