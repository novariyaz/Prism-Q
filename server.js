/**
 * PRISM Q - Secure API Proxy & Static File Server
 * Run locally via: node server.js
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable JSON body parsing with large limit for image OCR uploads
app.use(express.json({ limit: '15mb' }));

// Serve static web app assets from root
app.use(express.static(__dirname));

// Secure Proxy Endpoint for Gemini generateContent calls
app.post('/api/audit', async (req, res) => {
  try {
    const { model, contents, generationConfig } = req.body;
    
    // Prioritize key from server environment variables; fall back to client header if present
    const apiKey = process.env.GEMINI_API_KEY || req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({
        error: {
          code: 401,
          status: 'UNAUTHORIZED',
          message: 'Gemini API Key is missing on the server and no client key header was provided.'
        }
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contents, generationConfig })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Server proxy error:', error);
    res.status(500).json({
      error: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
        message: `Secure proxy server error: ${error.message}`
      }
    });
  }
});

// Fallback for Single Page App routing (serve index.html for client routes)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\n🔮 PRISM Q Hybrid Server running on http://localhost:${PORT}`);
  console.log(`📂 Serving static files from: ${__dirname}`);
  if (process.env.GEMINI_API_KEY) {
    console.log(`🔑 GEMINI_API_KEY environment variable detected (API requests will route securely).`);
  } else {
    console.log(`⚠️  No GEMINI_API_KEY env variable found. Using client settings API key header as backup.`);
  }
});
