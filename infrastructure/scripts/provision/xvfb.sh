#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing XVFB"
    dpkg --configure -a
    apt-get update
    apt-get --yes install xvfb
BLOCK
