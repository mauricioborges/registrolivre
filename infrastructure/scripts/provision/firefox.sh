#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing Firefox"
    dpkg --configure -a
    add-apt-repository --yes ppa:ubuntu-mozilla-security/ppa
    apt-get update
    apt-get --yes install firefox
BLOCK
