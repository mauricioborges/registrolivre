psql -d registro_livre -c "drop table if exists documents cascade; drop table if exists companies cascade;"
gradle copyVendorFiles bootRun &
sleep 30
psql -d registro_livre -c "insert into companies(cnpj, company_name, trade_name, id) values('81.746.232/0001-95', 'Test CNPJ', 'Test CNPJ', 99999);"
webdriver-manager start &
sleep 5
protractor src/test/resources/functional/conf.js
exit