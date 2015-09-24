psql -d registro_livre -c "drop table if exists documents cascade; drop table if exists companies cascade;"
gradle copyVendorFiles bootRun &
sleep 15
webdriver-manager start &
sleep 5
protractor src/test/resources/functional/conf.js
exit