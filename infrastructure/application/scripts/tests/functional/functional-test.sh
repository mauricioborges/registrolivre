psql -c "drop database if exists registro_livre;"
psql -c "create database registro_livre with owner registro_livre_user;"
gradle copyVendorFiles bootRun 2>&1 &
sleep 30
webdriver-manager start > /dev/null 2>&1 &
sleep 5
protractor src/test/resources/functional/firefox-conf.js
sleep 5
curl "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"
pkill -f gradle
exit