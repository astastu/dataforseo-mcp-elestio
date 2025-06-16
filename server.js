const express = require('express');
const app = express();

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'DataforSEO MCP Server',
    username: process.env.DATAFORSEO_USERNAME ? 'configured' : 'not configured'
  });
});

// Simple test endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DataforSEO MCP Server is running!',
    port: process.env.PORT || 3000
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DataforSEO MCP Server listening on port ${PORT}`);
});
