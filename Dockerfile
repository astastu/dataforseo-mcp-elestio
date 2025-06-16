FROM node:18-alpine
WORKDIR /app

# Install DataforSEO MCP server globally
RUN npm install -g dataforseo-mcp-server

# Create a simple HTTP wrapper for the MCP server
COPY server.js /app/server.js

# Expose the HTTP port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
