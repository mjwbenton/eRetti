export PATH=$HOME/node-v14.3.0-linux-armv7l/bin:$PATH
TERM=linux
# If we're not already in a screen
if [ -z "$STY" ]; then
    # if there isn't a screen session called kindlewriter
    # then start it and start the server
    if ! screen -list | grep -q "kindlewriter"; then
        screen -S kindlewriter "$HOME/run.sh";
    # else connect to the existing session
    else
        screen -x -r kindlewriter;
    fi
fi
