#!/bin/sh

# Drop and create database
psql -c "drop database if exists registro_livre;"
psql -c "create database registro_livre with owner registro_livre_user;"

# Execute registro livre application
cd registrolivre
./gradlew copyVendorFiles bootRun 2>&1 &

# sleep
sleep 30

# start webdriver server
webdriver-manager start > /dev/null 2>&1 &
sleep 5

# execute test
protractor src/test/resources/functional/firefox-conf.js
sleep 5
curl "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"
pkill -f gradle
exit