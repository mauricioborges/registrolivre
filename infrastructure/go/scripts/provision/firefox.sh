#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing FIREFOX"
    apt-get update
sudo apt-get  --yes install firefox
BLOCK