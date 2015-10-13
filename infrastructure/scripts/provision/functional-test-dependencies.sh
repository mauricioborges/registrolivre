!/bin/sh

set -e

sudo su <<BLOCK
    dpkg --configure -a
    apt-get update

    echo "=====> Installing Make"
    apt-get --yes install make

    echo "=====> Installing g++"
    apt-get --yes install g++

    echo "=====> Installing CURL"
    apt-get --yes install curl

    echo "=====> Installing Node JS/NPM"
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
    apt-get --yes install nodejs

    echo "=====> Installing Protractor"
    npm install protractor -g --unsafe-perm

    echo "=====> Configuring webdriver-manager"
    webdriver-manager update --standalone
BLOCK
