import React, {Component} from 'react';
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
                   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [
                                {
                                   id: "1",
                                   username: "Bob",
                                   content: "Has anyone seen my marbles?",
                                },
                                {
                                   id: '2',
                                   username: "Anonymous",
                                   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                                 }
                               ],
                    counter: 4
                  };

    this._addMessage= this._addMessage.bind(this);
    }


  _addMessage(message){
    this.setState({ counter: this.state.counter + 1 });
    const newMessage = {id: this.state.counter, username: this.state.currentUser.name, content: message};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {

    return (
     <div>
     <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
     </nav>
     <MessageList messages={this.state.messages}/>
     <Chatbar addMessage={this._addMessage} currentUser={this.state.currentUser.name}/>
     </div>
    );
  };

}



