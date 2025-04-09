// Simple client example to connect to the Slack MCP Server with SSE transport

// Replace with your server URL
const SERVER_URL = 'http://localhost:3000/sse';

// Function to connect to the SSE endpoint
function connectToSSE() {
  console.log(`Connecting to SSE endpoint: ${SERVER_URL}`);
  
  // Create EventSource to connect to the SSE endpoint
  const eventSource = new EventSource(SERVER_URL);
  
  // Handle connection open
  eventSource.onopen = () => {
    console.log('Connected to SSE server');
  };
  
  // Handle messages
  eventSource.onmessage = (event) => {
    console.log('Received message:', event.data);
    try {
      const data = JSON.parse(event.data);
      console.log('Parsed data:', data);
    } catch (error) {
      console.log('Raw message (not JSON):', event.data);
    }
  };
  
  // Handle errors
  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error);
    eventSource.close();
    console.log('Connection closed due to error. Reconnecting in 5 seconds...');
    setTimeout(connectToSSE, 5000);
  };
  
  // Example of sending a request to the MCP server
  // This would typically be done through an MCP client library
  function sendExampleRequest() {
    const requestId = Date.now().toString();
    const request = {
      id: requestId,
      method: 'tool',
      params: {
        name: 'slack_list_channels',
        arguments: {
          limit: 10
        }
      }
    };
    
    console.log('Sending example request:', request);
    
    // In a real MCP client, you would send this request to the server
    // and handle the response through the SSE connection
    console.log('Note: This is just an example. In a real MCP client, you would send this request to the server.');
  }
  
  // Call the example request function after a short delay
  setTimeout(sendExampleRequest, 2000);
  
  return eventSource;
}

// Start the connection
const eventSource = connectToSSE();

// Handle process termination
process.on('SIGINT', () => {
  console.log('Closing SSE connection...');
  eventSource.close();
  process.exit(0);
});