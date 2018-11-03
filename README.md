Chatty App
=====================
A real time web application using webSockets that introduced us to popular librabries such as React, Babel and Webpack.
## Final Product

!["Screenshot of Chatty App with one user"](https://github.com/carlocadiz/Chatty-App/blob/master/docs/ChattyApp-single%20user%20.png)
!["Screenshot of multiple users chatting simultaneously"](https://github.com/carlocadiz/Chatty-App/blob/master/docs/ChattyApp-multiple%20users.png)
!["Screenshot of one exiting"](https://github.com/carlocadiz/Chatty-App/blob/master/docs/ChattyApp-one%20user%20exits.%20%20.png)


## Dependencies for root directory(Webpack and React)
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom
- prop-types

## Dependencies for root directory(Webpack and React)
- express
- ws
- uuid

## Getting Started

- Install all dependencies (using the `npm install`) command. This will need to be performed in the root directory Webpack and React dependencies and the Chatty_server directory for the Websockets server.
- Run both servers using the `npm start` command.

## Functional Requirements
Primarily a client-side SPA (single-page app) built with ReactJS
Contains a chat log displaying messages and notifications
Contains an input field to change your name and an input field to send a message
The client-side app communicates with a server via WebSockets for multi-user real-time updates
No persistent database is involved

## Behaviour Requirements
When any connected user sends a chat message, all connected users receive and display the message
When any connected user changes their name, all connected users are notified of the name change
Notifications are styled differently from chat messages
Header will display the count of connected users
When the number of connected users changes, this count will be updated for all connected users
Different users' names will each be coloured differently randomly selected by the server

## Technical Specifications
### Stack:

Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
WebSockets using Node package ws on the server-side, and native WebSocket on client side
ReactJS
