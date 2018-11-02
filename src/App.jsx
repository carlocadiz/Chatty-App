import React, {Component} from 'react';
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  currentUser: "Anonymous",
                  messages: [], // messages coming from the server will be stored here as they arrive
                  };

    this._addMessage= this._addMessage.bind(this);
    }

  _addMessage(message){
    console.log(message)

    if (message.name !== this.state.currentUser){
      const notificationtoServer = {type: 'postNotification', content: `${this.state.currentUser} has changed their name to ${message.name}`};
      this.socket.send(JSON.stringify(notificationtoServer));
      //this.setState({c})
    } else {
        const messageToServer = {type: 'postMessage', username: message.name , content: message.content, color: this.state.color };
        this.socket.send(JSON.stringify(messageToServer));

    }
    this.setState({currentUser: message.name});
  }


  componentDidMount() {
   // let localColour = "";
    this.socket = new WebSocket("ws://localhost:3001")

    this.socket.onopen = function(event) {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      //console.log(event);
      const serverData = JSON.parse(event.data);

      switch(serverData.type) {
      case "incomingMessage":
        // handle incoming message
        const newMessage = {type: serverData.type, id: serverData.id, content: serverData.content, username: serverData.username, color: serverData.color};
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        console.log('colour',this.state.messages)
        break;

      case "incomingNotification":

        const notificationMessage = {type: serverData.type, id: serverData.id, content:serverData.content};
        this.setState({messages: this.state.messages.concat(notificationMessage)});
        break;
      case "color":

        this.setState({color: serverData.color});
        console.log(serverData.color)

        break;
      case "numberOfUsers":
        // show an error in the console if the message type is unknown
        console.log(event.data)
        this.setState({users:serverData.number})
        break;
        //throw new Error("Unknown event type " + data.type);
      }

    }

    console.log("componentDidMount <App />");
  }

  render() {

    return (
     <div>
     <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
     <span className="navbar-users">Users online: {this.state.users}</span>

     </nav>
     <MessageList messages={this.state.messages}/>
     <Chatbar addMessage={this._addMessage} currentUser={this.state.currentUser}/>
     </div>
    );
  };

}



