# Deployment Guide for GetSetRide Frontend

## Deploy to Vercel

### Option 1: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Import your Git repository**
3. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://getsetride-backend.onrender.com/api`
4. **Deploy**

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variable
vercel env add VITE_API_URL production
# Enter value: https://getsetride-backend.onrender.com/api

# Redeploy with environment variable
vercel --prod
```

## IMPORTANT: Update Backend CORS Settings

Your backend at `https://getsetride-backend.onrender.com` needs to allow requests from your Vercel deployment.

### Update your backend's CORS configuration to include:

```javascript
const allowedOrigins = [
  'https://get-set-ride-react.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

## Testing

After deployment, test your API calls:

```bash
# Check if API is accessible
curl -I https://get-set-ride-react.vercel.app

# Check if backend allows your frontend
curl -H "Origin: https://get-set-ride-react.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  https://getsetride-backend.onrender.com/api/cars
```

## Environment Variables

### Development (.env)
```
VITE_API_URL=/api
```

### Production (Vercel Dashboard)
```
VITE_API_URL=https://getsetride-backend.onrender.com/api
```

## Troubleshooting

### Error: "fetch failed" or "CORS error"
- **Solution**: Update backend CORS settings to allow `https://get-set-ride-react.vercel.app`

### Error: "404 Not Found" on refresh
- **Solution**: Already handled by `vercel.json` rewrites configuration

### Environment variables not working
- **Solution**: Make sure to redeploy after adding environment variables in Vercel dashboard
