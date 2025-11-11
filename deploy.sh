#!/bin/bash

echo "🚀 GetSetRide Frontend Deployment Helper"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed."
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
else
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo ""
echo "⚠️  IMPORTANT: Make sure you've set the environment variable in Vercel Dashboard:"
echo "   Key: VITE_API_URL"
echo "   Value: https://getsetride-backend.onrender.com/api"
echo ""
read -p "Have you set the environment variable in Vercel? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🚀 Deploying..."
    vercel --prod
    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update your backend CORS settings to allow: https://get-set-ride-react.vercel.app"
    echo "2. Test your deployment: https://get-set-ride-react.vercel.app"
else
    echo ""
    echo "📝 To set environment variable:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Select your project"
    echo "3. Go to Settings > Environment Variables"
    echo "4. Add: VITE_API_URL = https://getsetride-backend.onrender.com/api"
    echo "5. Run this script again"
fi
