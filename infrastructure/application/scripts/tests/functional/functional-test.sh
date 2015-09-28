psql -d registro_livre -c "drop database if exists registro_livre;"
psql -d registro_livre -c "create database registro_livre with owner registro_livre_user;"
gradle copyVendorFiles bootRun &
sleep 30
psql -d registro_livre -c "insert into companies(cnpj, company_name, trade_name, id) values('81.746.232/0001-95', 'Test CNPJ', 'Test CNPJ', 99999);"
webdriver-manager start &
sleep 5
protractor src/test/resources/functional/conf.js
sleep 5
curl "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"
pkill -f gradle
exit