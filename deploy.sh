#!/bin/bash

# Codenova Web Deployment Script
# This script builds and deploys the application using PM2

echo "🚀 Starting deployment for Codenova Innovations Website..."

# Stop existing PM2 process (if running)
echo "📦 Stopping existing process..."
pm2 stop codenova-web 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Start with PM2
echo "▶️  Starting application with PM2..."
pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

# Show status
echo "✅ Deployment complete!"
echo ""
echo "Application Status:"
pm2 status codenova-web
echo ""
echo "Access the application at: http://100.94.190.92/codenova-web"
echo ""
echo "Logs:"
echo "  - View logs: pm2 logs codenova-web"
echo "  - Error logs: ./logs/error.log"
echo "  - Output logs: ./logs/out.log"
