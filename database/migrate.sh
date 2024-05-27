#!/bin/bash

read -p "Enter the environment (local/prod): " user_input
user_input=${user_input:-local}

if [ "$user_input" != "local" ]; then
    read -p "Enter the URL: " url
    if [ -z "$url" ]; then
        echo "URL cannot be empty when environment is not 'local'. Exiting."
        exit 1
    fi
fi

node index.js $user_input $url
