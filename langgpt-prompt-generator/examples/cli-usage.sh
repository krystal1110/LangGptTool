#!/bin/bash

# Install the package globally (uncomment when publishing)
# npm install -g langgpt-prompt-generator

# For local development, use npx
echo "Running prompt generator..."
npx ../index.js generate

# Running the server
echo "Starting the server..."
npx ../index.js serve &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

# Use curl to test the API
echo "Testing the API..."
curl -X POST http://localhost:3000/generate-prompt \
  -H "Content-Type: application/json" \
  -d '{
    "promptType": "Code Generator",
    "language": "Python",
    "description": "Create a function to calculate the Fibonacci sequence up to n terms.",
    "constraints": "Use recursion, Add memoization for efficiency"
  }'

# Kill the server
echo "Stopping the server..."
kill $SERVER_PID