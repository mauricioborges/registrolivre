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

## Pré-requisitos para executar os testes de front-end

### Mac OS X

```
$ brew install node
```

No Mac OS X, instalando somente o 'node', o npm já é incluso.

### Linux

```
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

## Como executar os testes de front-end

```
$ ./gradlew jsTest
```

## Como executar os testes funcionais

Dependências:
Instalar Protractor como global: npm install protactor -g

```
$ ./gradlew functionalTest
```

#  Como fazer o deploy do GO-CD no seu computador

Para ter uma instância do GO-CD executando no seu computador, basta executar o comando abaixo:

```
$ ./gradlew bringUpGoServerLocally
```

Após a inicialização da máquina, execute provisionGoServer para fazer o provisionamento da maquina, o que irá instalar e configurar todos os requisitos necessários:

```
$ ./gradlew provisionGoServerLocally
```

Ao fazer isso o GO-CD será configurado dentro da máquina virtual criada no passo anterior, permitindo o acesso ao GO-CD através das configurações informadas no Vagrantfile na pasta infrastructure/go. Se as configurações padrões foram mantidas, o acesso será através da url:  192.168.33.10:8153/go.

Além disso você pode destruir a máquina virtual executando o comando:

```
$ ./gradlew destroyGoServerLocally
```

E a qualquer momento verificar o status da máquina virtual usando:

```
$ ./gradlew statusGoServerLocally
```

## Permissões de acesso
O GO-CD provê duas formas para autenticação de acesso. A primeira utilizando um arquivo de configuração de senhas (no formato padrão do Apache htpasswd) ou por autenticação LDAP/ActiveDirectory. Para este projeto nós utilizaremos a primeira opção. Você pode saber mais sobre as formas de autenticação lendo a documentado do GO-CD na parte de autentication, [clicando aqui](http://www.go.cd/documentation/user/current/configuration/dev_authentication.html).

O arquivo com as configurações de senhas pode ser encontrado em:

```
$ infrastructure/go/configurations/htpasswd
```

Para criar um login de acesso, primeiro verifique se você já possui o Apache htpasswd instalado no seu computador, caso não o possua, [clique aqui](http://www.go.cd/documentation/user/current/configuration/dev_authentication.html#generating-passwords-using-htpasswd ) para saber como instalar.

Uma vez instalado, vá até a pasta root do projeto e execute o seguinte comando:

```
$ htpasswd -s infrastructure/go/configurations/htpasswd "username desejado"

```
A senha desejada será solicitada e armazenada no arquivo htpasswd (usando hash SHA1), lembrando que será necessário executar o provisionamento da máquina virtual utilizada pelo go novamente.

# Criar Máquina Virtual Local

O ambiente local para executar a aplicação é em uma máquina virtual.
Para criar a máquina virtual no ambiente local, execute o script abaixo:

```
$ ./gradlew createVirtualMachine
```

* Se é utilizada outra ferramenta de shell diferente de Bash, é necessário atualizar as váriaveis de ambiente com o comando:
$ source <RAIZ DO PROJETO>/.profile

### Como criar migrations

Migrations devem ser adicionadas no diretório src/main/resources/db/migration/.

#### Nomenclatura

Os arquivos de migration devem seguir o padrão abaixo de nomenclatura.
* Prefixo: V
* Versão: Pontos e underscores separão as partes, você pode usar quantas partes quiser
* Separador: __ (dois underscores)
* Descrição: Underscores separam as palavras
* Sufixo: .sql

**Exemplo**: V1__init.sql

#### Executar migrations

Para executar as migrations na Máquina Virtual é só fazer um novo deploy da aplicação, executando:

```
$ ./gradlew deployLocalAppServer
```

## Deploy da aplicação no ambiente local

Para fazer o deploy da aplicação no ambiente local, antes você deve executar as tasks "bringUpLocalAppServer", "provisionLocalAppServer" e "createLocalDatabase"

A task para efetuar o deploy da aplicação:

```
$ ./gradlew deployLocalAppServer
```

Url para acessar a aplicação local: http://192.168.33.71:5000/

# Aplicação em Produção

Url para acessar a aplicação: http://ec2-54-232-246-149.sa-east-1.compute.amazonaws.com:5000/
