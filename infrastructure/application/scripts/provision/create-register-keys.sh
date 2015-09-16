#!/bin/sh

set -e

echo #creating keys

root=$(pwd)/../..

rm -rf .keys
mkdir .keys
cd .keys

ssh-keygen -t rsa -N "" -b 4096 -C "registrolivre" -f registrolivre

cp registrolivre.pub ../public_keys/

if [ -z "$(cat ${root}/.profile | grep REGISTROLIVRE_PRIVATE_KEY)" ]; then
    echo 'export REGISTROLIVRE_PRIVATE_KEY=$(pwd)/infrastructure/application/registrolivre' | tee -a ${root}/.profile
fi

if [ -z "$(cat ${root}/.profile | grep LOCAL_REGISTROLIVRE_IP)" ]; then
    echo 'export LOCAL_REGISTROLIVRE_IP="192.168.33.71"' | tee -a ${root}/.profile
fi

source ${root}/.profile