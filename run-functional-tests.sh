#!/bin/sh

docker-machine --version
if [ $? -eq 0 ];then 
    docker-machine status default
    if [ $? -ne 0 ];then 
      docker-machine start default
      if [ "$?" != "0" ];then
          echo "Default machine not created!!! do it with 'docker-machine create default --driver VirtualBox' and try again"
          exit 1;
      fi
    fi
    eval $(docker-machine env default)
fi

docker-compose stop -t 0
docker-compose rm -f

docker-compose up -d db reglivre

sleep 25

docker-compose run functional-tests


