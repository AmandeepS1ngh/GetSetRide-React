// Debug page to check environment variables
import React from 'react';

const DebugPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isDev = import.meta.env.DEV;
  const mode = import.meta.env.MODE;
  const prod = import.meta.env.PROD;

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Debug Info</h1>
      <div style={{ background: '#f0f0f0', padding: '20px', marginTop: '20px' }}>
        <h2>Environment Variables:</h2>
        <p><strong>VITE_API_URL:</strong> {apiUrl || 'NOT SET'}</p>
        <p><strong>import.meta.env.DEV:</strong> {String(isDev)}</p>
        <p><strong>import.meta.env.PROD:</strong> {String(prod)}</p>
        <p><strong>import.meta.env.MODE:</strong> {mode}</p>
      </div>
      
      <div style={{ background: '#ffe0e0', padding: '20px', marginTop: '20px' }}>
        <h2>Computed API URL:</h2>
        <p><strong>Will use:</strong> {apiUrl || (isDev ? '/api' : 'https://getsetride-backend.onrender.com/api')}</p>
      </div>

      <div style={{ background: '#e0ffe0', padding: '20px', marginTop: '20px' }}>
        <h2>Expected Behavior:</h2>
        <p>Development: Should use <code>/api</code> (proxied)</p>
        <p>Production: Should use <code>https://getsetride-backend.onrender.com/api</code></p>
      </div>

      <div style={{ background: '#e0e0ff', padding: '20px', marginTop: '20px' }}>
        <h2>How to Fix:</h2>
        <ol>
          <li>Go to Vercel Dashboard</li>
          <li>Settings → Environment Variables</li>
          <li>Add: VITE_API_URL = https://getsetride-backend.onrender.com/api</li>
          <li>Redeploy</li>
        </ol>
      </div>
    </div>
  );
};

export default DebugPage;
