#!/bin/sh
### BEGIN INIT INFO
# Provides:          registrolivre
# Required-Start:    $local_fs $remote_fs $network $syslog
# Required-Stop:     $local_fs $remote_fs $network $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# X-Interactive:     true
# Short-Description: Start/stop/Restart registrolivre server
### END INIT INFO

get_app_pid() {
    echo $(ps aux | \
        grep registrolivre.jar | \
        grep -v grep | \
        sed 's/ \+/ /g'| \
        cut -d ' ' -f 2)
}

is_app_running() {
    if ps aux | grep registrolivre.jar | grep -v grep; then
        return 0
    fi

    return 1
}

case $1 in
    start)
        if ! is_app_running; then
            echo "Starting registrolivre service ..."
            echo "Loading environment variables"
            . /home/registrolivre/.profile
            nohup java -Dserver.port=5000 -jar /home/registrolivre/app/registrolivre.jar /home/registrolivre/app 2>> /home/registrolivre/app/logs.txt >> /home/registrolivre/app/logs.txt &
            echo "registrolivre service started ..."
        else
            echo "registrolivre service is already running ..."
        fi
    ;;
    stop)
        if is_app_running; then
            echo "Stopping registrolivre service ..."
            kill $(get_app_pid);
            echo "registrolivre service stopped ..."
        else
            echo "registrolivre service is not running ..."
        fi
    ;;
    restart)
        if [ -f /home/registrolivre/app/pid ]; then
            PID=$(cat /home/registrolivre/app/pid);
            echo "Stopping registrolivre service ...";
            kill $PID;
            echo "registrolivre service stopped ...";
            rm /home/registrolivre/app/pid

            echo "Starting registrolivre service ..."
             echo "Loading environment variables"
            . /home/registrolivre/.profile
            nohup java -Dserver.port=5000 -jar /home/registrolivre/app/registrolivre.jar /home/registrolivre/app 2>> /home/registrolivre/app/logs.txt >> /home/registrolivre/app/logs.txt &
            echo $! > /home/registrolivre/app/pid
            echo "registrolivre service started ..."
        else
            echo "registrolivre service is not running ..."
        fi
    ;;
esac
