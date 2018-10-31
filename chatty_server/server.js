// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid= require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast to everyone else.
  ws.on('message', (data) => {
    const dataReceived = JSON.parse(data)
    const dataSend = {id: uuid(), username: dataReceived.username, content: dataReceived.content}
    console.log(`User ${dataReceived.username} said ${dataReceived.content}`);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
         console.log(JSON.stringify(dataSend));
         client.send(JSON.stringify(dataSend));
      }
    });
  });

  // ws.on('message', (data) => {
  //   const dataReceived = JSON.parse(data)
  //   console.log(`User ${dataReceived.username} said ${dataReceived.content}`);
  // });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')});

});