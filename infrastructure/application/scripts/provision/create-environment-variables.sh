#!/bin/sh

set -e

USER="/home/registrolivre"
SECRET=$REGISTROLIVRE_AWS_SECRET_ACCESS_KEY
ID=$REGISTROLIVRE_AWS_ACCESS_KEY_ID

echo "=====> AWS variables"
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "echo 'export REGISTROLIVRE_AWS_ACCESS_KEY_ID=${ID}' | sudo tee -a ${USER}/.profile"
ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "echo 'export REGISTROLIVRE_AWS_SECRET_ACCESS_KEY=${SECRET}' | sudo tee -a ${USER}/.profile"
#ssh -i $REGISTROLIVRE_PRIVATE_KEY registrolivre@$LOCAL_REGISTROLIVRE_IP "source /home/registrolivre/.profile"
