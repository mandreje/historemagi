#!/bin/sh
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_linux_amd64.zip -o pocketbase.zip
unzip pocketbase.zip
rm pocketbase.zip
chmod +x ./pocketbase
./pocketbase serve --http="127.0.0.1:8090"