#!/bin/sh
# Download PocketBase
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_linux_amd64.zip -o pocketbase.zip
unzip pocketbase.zip
rm pocketbase.zip
chmod +x ./pocketbase

# Start PocketBase with host 0.0.0.0 to allow external connections
./pocketbase serve --http="0.0.0.0:8090" --dir="./pb_data"