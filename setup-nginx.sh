#!/bin/bash

echo "========================================="
echo "Codenova Web - Nginx Setup Script"
echo "========================================="
echo ""

# Step 1: Backup current config
echo "[1/6] Creating backup of Nginx config..."
sudo cp /etc/nginx/sites-available/pemacs-dev /etc/nginx/sites-available/pemacs-dev.backup-$(date +%Y%m%d-%H%M%S)
echo "✓ Backup created"
echo ""

# Step 2: Create Codenova config block
echo "[2/6] Creating Codenova configuration block..."
cat > /tmp/codenova-nginx-insert.conf << 'EOFCONFIG'
    #-----------------------------------------------------------
    # Codenova Web Routes
    #-----------------------------------------------------------
    
    # Static assets (_nuxt directory) - cached with long expiry
    location /codenova-web/_nuxt/ {
        proxy_pass http://localhost:4000/codenova-web/_nuxt/;
        proxy_http_version 1.1;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
    }
    
    # Main application
    location /codenova-web {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Disable caching for HTML
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

EOFCONFIG
echo "✓ Configuration block created"
echo ""

# Step 3: Insert into Nginx config
echo "[3/6] Inserting Codenova block into Nginx config..."
sudo awk '
    /^[[:space:]]*#.*Malbusiness.*Default.*MUST BE LAST/ {
        # Print Codenova block before Malbusiness comment
        system("cat /tmp/codenova-nginx-insert.conf")
        print ""
    }
    { print }
' /etc/nginx/sites-available/pemacs-dev > /tmp/pemacs-new.conf

sudo mv /tmp/pemacs-new.conf /etc/nginx/sites-available/pemacs-dev
echo "✓ Nginx config updated"
echo ""

# Step 4: Test Nginx configuration
echo "[4/6] Testing Nginx configuration..."
sudo nginx -t
if [ $? -eq 0 ]; then
    echo "✓ Nginx configuration is valid"
else
    echo "✗ Nginx configuration has errors!"
    echo "Restoring backup..."
    sudo cp /etc/nginx/sites-available/pemacs-dev.backup-* /etc/nginx/sites-available/pemacs-dev
    exit 1
fi
echo ""

# Step 5: Reload Nginx
echo "[5/6] Reloading Nginx..."
sudo systemctl reload nginx
if [ $? -eq 0 ]; then
    echo "✓ Nginx reloaded successfully"
else
    echo "✗ Failed to reload Nginx!"
    exit 1
fi
echo ""

# Step 6: Save PM2 configuration
echo "[6/6] Saving PM2 configuration..."
pm2 save
echo "✓ PM2 configuration saved"
echo ""

# Test the deployment
echo "========================================="
echo "Testing deployment..."
echo "========================================="
echo ""

echo "Testing local access (port 4000)..."
curl -s -I http://localhost:4000/codenova-web/ | head -1

echo ""
echo "Testing public access (217.117.2.101)..."
curl -s -I http://217.117.2.101/codenova-web/ | head -1

echo ""
echo "========================================="
echo "✓ Deployment Complete!"
echo "========================================="
echo ""
echo "Your Codenova website is now accessible at:"
echo "  • Public: http://217.117.2.101/codenova-web"
echo "  • Direct: http://100.94.190.92:4000/codenova-web"
echo ""
echo "PM2 Status:"
pm2 list | grep codenova-web
echo ""
