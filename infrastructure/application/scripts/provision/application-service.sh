#!/bin/bash

function get_app_pid {
    echo $(ps aux | \
        grep registrolivre.jar | \
        grep -v grep | \
        sed 's/ \+/ /g'| \
        cut -d ' ' -f 2)
}

function is_app_running {
    if ps aux | grep registrolivre.jar | grep -v grep; then
        return 0
    fi

    return 1
}

function start_app {
    if ! is_app_running; then
        echo "Starting registrolivre service ..."
        echo "Loading environment variables"
        . /home/registrolivre/.profile

        nohup java -Dserver.port=5000 -jar /home/registrolivre/app/registrolivre.jar \
            /home/registrolivre/app \
            2>> /home/registrolivre/app/logs.txt \
            >> /home/registrolivre/app/logs.txt &

        echo "registrolivre service started ..."
    else
        echo "registrolivre service is already running ..."
    fi
}

function stop_app {
    if is_app_running; then
        echo "Stopping registrolivre service ..."
        kill $(get_app_pid);
        echo "registrolivre service stopped ..."
    else
        echo "registrolivre service is not running ..."
    fi
}

case $1 in
    start)
        start_app
    ;;
    stop)
        stop_app
    ;;
    restart)
        stop_app
        while is_app_running; do
            sleep 5
        done
        start_app
    ;;
esac
