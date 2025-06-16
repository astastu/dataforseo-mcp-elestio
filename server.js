const { spawn } = require('child_process');
const express = require('express');
const app = express();

// Environment variables
const DATAFORSEO_USERNAME = process.env.DATAFORSEO_USERNAME;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

// Create HTTP endpoints that wrap the MCP server
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'DataforSEO MCP Server' });
});

// MCP HTTP Streamable endpoint
app.post('/stream', (req, res) => {
  // Spawn the MCP server process
  const mcp = spawn('npx', ['dataforseo-mcp-server'], {
    env: {
      ...process.env,
      DATAFORSEO_USERNAME,
      DATAFORSEO_PASSWORD
    }
  });

  // Handle the communication
  mcp.stdout.on('data', (data) => {
    res.write(data);
  });

  req.on('data', (data) => {
    mcp.stdin.write(data);
  });

  req.on('end', () => {
    mcp.stdin.end();
  });

  mcp.on('close', () => {
    res.end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`DataforSEO MCP Server listening on port ${PORT}`);
});
