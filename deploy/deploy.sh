#!/bin/bash
# AudioVido Deployment Script
# Run on the server after cloning the repo

set -e

echo "=== AudioVido Deployment ==="

# Configuration
DOMAIN="audiovido.com"
APP_DIR="/var/www/audiovido"
REPO_URL="https://github.com/pedrammokarrami/petros-nexus.git"

# Update system
echo ">>> Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo ">>> Installing dependencies..."
apt install -y nginx curl git build-essential

# Install Node.js 20.x
echo ">>> Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
echo ">>> Installing PM2..."
npm install -g pm2

# Create app directory
echo ">>> Setting up application..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone repo (or pull if exists)
if [ -d "$APP_DIR/.git" ]; then
    git pull origin main
else
    git clone $REPO_URL .
fi

# Go to platform directory
cd audiovido-platform

# Install deps and build
echo ">>> Building frontend..."
npm install
npm run build

# Create production .env
echo ">>> Creating .env.production..."
cat > .env.production << 'EOF'
VITE_API_BASE_URL=https://$DOMAIN
VITE_SUPABASE_URL=https://fxgkayatfvdmwzvsicyr.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_c7lzWiwo9Le8tqAG687MZA_nD24U1ZA
VITE_JAMENDO_CLIENT_ID=42c3b201
VITE_PEXELS_API_KEY=XWgccpzFNaLieQghFrDH62Yqoz02tM4D3AG9GuMrie7RzcIr6munUsbj
VITE_OPENROUTER_API_KEY=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
VITE_TMDB_API_KEY=d9365d9f750f8ad5699f2a83e74a7134
EOF

# Create symlink for .env
cp .env.production .env

# Install server deps
npm install express cors

# Start API server with PM2
echo ">>> Starting API server..."
pm2 start server/index.js --name "audiovido-api"
pm2 save
pm2 startup

# Setup Nginx
echo ">>> Configuring Nginx..."
cp ../deploy/nginx-audiovido.conf /etc/nginx/sites-available/audiovido
ln -sf /etc/nginx/sites-available/audiovido /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# SSL with Let's Encrypt
echo ">>> Setting up SSL..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Firewall
echo ">>> Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "=== Deployment Complete! ==="
echo "Frontend: https://$DOMAIN"
echo "Status:   https://$DOMAIN/status"
echo "API:      https://$DOMAIN/api/health"
