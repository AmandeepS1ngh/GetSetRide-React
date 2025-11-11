# Quick Fix for Vercel Deployment

## The Problem
Your frontend at `https://get-set-ride-react.vercel.app/` is trying to fetch from `/api` (relative path), but there's no proxy in production, so it's trying to fetch from `https://get-set-ride-react.vercel.app/api` instead of your backend.

## The Solution (2 Steps)

### Step 1: Add Environment Variable in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Click on your project: **get-set-ride-react**
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Click **Add New**
6. Fill in:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://getsetride-backend.onrender.com/api`
   - **Environment**: Check all (Production, Preview, Development)
7. Click **Save**

### Step 2: Redeploy

After adding the environment variable, you need to redeploy:

#### Option A: Through Vercel Dashboard
1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Check **Use existing Build Cache**
5. Click **Redeploy**

#### Option B: Push to Git
```bash
# Make a small change and push
git add .
git commit -m "Add environment variable configuration"
git push
```

#### Option C: Using Vercel CLI
```bash
vercel --prod
```

### Step 3: Update Backend CORS (IMPORTANT!)

Your backend needs to allow requests from your Vercel URL. Contact your backend developer or update the CORS settings to include:

```javascript
const allowedOrigins = [
  'https://get-set-ride-react.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];
```

## Verification

After redeploying, test if it works:

1. Open: https://get-set-ride-react.vercel.app/
2. Open browser console (F12)
3. Check the Network tab
4. Look for API calls - they should go to `https://getsetride-backend.onrender.com/api/...`

## Still Not Working?

Check these:

1. **Environment variable not loaded**: Vercel caches builds. Make sure to redeploy after adding env var.
2. **CORS error**: Backend must allow `https://get-set-ride-react.vercel.app`
3. **Backend down**: Check if `https://getsetride-backend.onrender.com/api/cars` is accessible

## Test Backend CORS

Run this command to check if your backend allows your Vercel URL:

```bash
curl -I -H "Origin: https://get-set-ride-react.vercel.app" https://getsetride-backend.onrender.com/api/cars
```

Look for:
```
access-control-allow-origin: https://get-set-ride-react.vercel.app
```

If it shows a different URL, your backend CORS needs to be updated!
