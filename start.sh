#!/bin/bash

echo "🚗 GetSetRide - Starting Application..."
echo ""

# Check if MongoDB is running
if ! pgrep -x mongod > /dev/null; then
    echo "⚠️  MongoDB is not running"
    echo "Starting MongoDB..."
    brew services start mongodb-community
    sleep 2
fi

echo "✅ MongoDB is running"
echo ""

# Start backend in a new terminal tab
echo "🔧 Starting Backend Server..."
osascript -e 'tell application "Terminal" to do script "cd '"$(pwd)"'/backend && npm run dev"'

sleep 2

echo "🎨 Starting Frontend Server..."
echo ""
npm run dev
