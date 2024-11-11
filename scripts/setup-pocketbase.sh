#!/bin/bash

# Create directories
mkdir -p pb_data
mkdir -p pb_migrations
mkdir -p pb_hooks

# Download PocketBase
echo "Downloading PocketBase..."
curl -L https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_linux_amd64.zip -o pocketbase.zip || {
    echo "Failed to download PocketBase"
    exit 1
}

# Extract PocketBase
echo "Extracting PocketBase..."
unzip -o pocketbase.zip || {
    echo "Failed to extract PocketBase"
    exit 1
}

# Clean up
rm pocketbase.zip

# Make executable
chmod +x pocketbase

# Start PocketBase
echo "Starting PocketBase..."
./pocketbase serve --http="127.0.0.1:8090" --dir="./pb_data"