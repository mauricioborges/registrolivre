#!/bin/sh

set -e
USER="registrolivre"

echo "=====> Creating registrolivre user"
if [ -z "$(getent passwd ${USER})" ]; then
    sudo useradd -d /home/${USER} -s /bin/bash -m ${USER}
    sudo usermod -a -G sudo ${USER}
    sudo usermod -a -G admin ${USER}
fi
