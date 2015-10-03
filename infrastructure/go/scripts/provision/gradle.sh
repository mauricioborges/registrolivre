#!/bin/sh

set -e

sudo su <<BLOCK
    echo "=====> Installing latest Gradle"
    sudo --yes add-apt-repository ppa:cwchien/gradle
    sudo apt-get update
    sudo apt-get install gradle-ppa
BLOCK