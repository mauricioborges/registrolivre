#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing  PROTRACTOR"
    sudo npm install protractor -g
BLOCK