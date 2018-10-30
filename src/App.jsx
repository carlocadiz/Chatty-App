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
                                   key: "1",
                                   username: "Bob",
                                   content: "Has anyone seen my marbles?",
                                },
                                {
                                   key: '2',
                                   username: "Anonymous",
                                   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                                 }
                               ]
                  };
    }

  render() {

    return (
     <div>
     <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
     </nav>
     <MessageList messages={this.state.messages}/>
     <Chatbar currentUser={this.state.currentUser.name}/>
     </div>
    );
  };
}



