#!/bin/bash

# Create necessary directories
sudo mkdir -p /var/log/pocketbase
sudo mkdir -p /usr/local/bin

# Create pocketbase user
sudo useradd -r -s /bin/false pocketbase

# Set permissions
sudo chown -R pocketbase:pocketbase /var/log/pocketbase

# Copy files
sudo cp pocketbase /usr/local/bin/
sudo cp pocketbase.service /etc/systemd/system/

# Reload systemd and start service
sudo systemctl daemon-reload
sudo systemctl enable pocketbase
sudo systemctl start pocketbase

# Install and configure nginx
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/pocketbase
sudo ln -s /etc/nginx/sites-available/pocketbase /etc/nginx/sites-enabled/

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL certificate
sudo certbot --nginx -d yourdomain.com