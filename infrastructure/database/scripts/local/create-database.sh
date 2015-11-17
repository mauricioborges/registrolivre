#!/bin/sh

set -e

DATABASE="/home/registrolivre/database"

source ~/.registro-livre-profile
echo "=====> Creating database"
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "rm -rf ${DATABASE}"
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "mkdir ${DATABASE}"
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "chmod 777 ${DATABASE}"
scp -i $REGISTROLIVRE_PRIVATE_KEY ./scripts/postgres-install.sh registrolivre@$LOCAL_REGISTROLIVRE_IP:${DATABASE}
scp -i $REGISTROLIVRE_PRIVATE_KEY ./scripts/apt.postgresql.org.sh registrolivre@$LOCAL_REGISTROLIVRE_IP:${DATABASE}
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "bash -s < ${DATABASE}/postgres-install.sh"
