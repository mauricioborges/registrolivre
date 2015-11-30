#!/bin/sh

docker-machine --version
if [ $? -eq 0 ];then
    STATUSDOCKER=`docker-machine status default`
    if [ $STATUSDOCKER == "Stopped" ];then
      docker-machine start default
      if [ "$?" != "0" ];then
          echo "Default machine not created!!! do it with 'docker-machine create default --driver VirtualBox' and try again"
          exit 1;
      fi
    fi
    eval $(docker-machine env default)

    echo "=====> Killing containers"
    docker-compose stop
    echo "=====> Starting containers"
    docker-compose up -d
else
    echo "Docker Machine not installed."
    exit 1;
fi

