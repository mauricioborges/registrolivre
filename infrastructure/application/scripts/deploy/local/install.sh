#!/bin/sh

set -e

APP="/home/registrolivre/app"
ROOT_PATH="./../../"

source ~/.registro-livre-profile

echo "=====> Generate jar"
${ROOT_PATH}gradlew :registroLivreJar

echo "=====> Stopping registrolivre service"
vagrant ssh -c "sudo service registrolivre stop"

echo "=====> Removing registrolivre jar"
vagrant ssh -c "rm -rf ${APP}/registrolivre.jar"

echo "=====> Copy jar to app folder"
cp ${ROOT_PATH}registrolivre.jar .
vagrant ssh -c "cp /vagrant/registrolivre.jar ${APP}/"
rm ./registrolivre.jar

echo "=====> Starting registrolivre service"
vagrant ssh -c "sudo service registrolivre start"
