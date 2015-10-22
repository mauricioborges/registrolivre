#!/bin/sh
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@192.168.33.71 << EOF

clean_database() {
  sudo -u postgres psql registro_livre -c "delete from partners; delete from documents; delete from companies;"
}

echo "Cleaning database before functional tests"
clean_database

echo "Running functional tests"
cd /home/registrolivre/registrolivre
xvfb-run protractor src/test/resources/functional/firefox-conf.js

echo "Removing data created by functional tests"
clean_database

EOF
