#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing Firefox 34.0.5"
    wget ftp.mozilla.org/pub/mozilla.org/firefox/releases/34.0.5/linux-x86_64/en-US/firefox-34.0.5.tar.bz2
    tar -xjvf firefox-34.0.5.tar.bz2
    mv firefox /opt/firefox
    ln -sf /opt/firefox/firefox /usr/bin/firefox
    rm firefox-34.0.5.tar.bz2
BLOCK
