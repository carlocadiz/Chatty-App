import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  currentUser: 'Anonymous',
                  messages: [], // messages coming from the server will be stored here as they arrive
                  };
    this._addMessage= this._addMessage.bind(this);
    }


  // creates the message and sends to server. Depending if user has changed, the proper message will
  // be built and sent. function is sent as a prop to Chatbar and returns an object username and message
  // content.
  _addMessage(message){
    let newMessage = '';
    if (message.name !== this.state.currentUser){
        newMessage = {type: 'incomingNotification',
                      content: `${this.state.currentUser} has changed their name to ${message.name}`};
    } else {
        newMessage = {type: 'incomingMessage',
                      username: message.name ,
                      content: message.content,
                      color: this.state.color };
    }
    this.socket.send(JSON.stringify(newMessage));
    this.setState({currentUser: message.name});
  }

  // Lifecycle method that creates a socket and connects to the server.
  // It will also receive incoming messages from the server, and updates object
  // elements dependant on message type.
  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');

      this.socket.onmessage = (event) => {
        const serverData = JSON.parse(event.data);

        switch(serverData.type) {

          case 'color':
            this.setState({color: serverData.color});
          break;

          case 'numberOfUsers':
            this.setState({users:serverData.number});
          break;

          default:
          this.setState({messages: this.state.messages.concat(serverData)});
        }
      }
    }


  // renders html and calls other compenants sending them props.
  render() {

    return (
     <div>
     <nav className='navbar'>
     <a href='/' className='navbar-brand'>Chatty</a>
     <span className='navbar-users'>Users online: {this.state.users}</span>

     </nav>
     <MessageList messages={this.state.messages}/>
     <Chatbar addMessage={this._addMessage} currentUser={this.state.currentUser}/>
     </div>
    );
  }

}



