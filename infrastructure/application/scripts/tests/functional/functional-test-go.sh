#!/bin/sh
clean_database() {
  psql registro_livre -c "delete from partners; delete from documents; delete from companies;"
}

echo "Cleaning database before functional tests"
clean_database

echo "Running functional tests"
cd /var/lib/go-agent/pipelines/Registro_Livre 
xvfb-run protractor src/test/resources/functional/firefox-conf.js

echo "Removing data created by functional tests"
clean_database

