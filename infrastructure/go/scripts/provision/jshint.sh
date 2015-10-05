#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing  JSHINT"
    sudo npm install jshint -g
BLOCK