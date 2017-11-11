#!/bin/sh
# Bradford Smith (bsmith8)
# CS 554 Lab 7 startBoth.sh
# small script to start both the server and worker in tmux panes

if command -v tmux >/dev/null 2>&1; then
    tmux new-session -d 'npm start'
    tmux split-window -v 'node worker.js'
    tmux -2 attach-session -d
else
    echo 'tmux is required'
    exit 1
fi
