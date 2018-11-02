import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

export default class MessageList extends Component{

  render(){

    return(

      <main className="messages">
        {
          this.props.messages.map(message => {
            if(message.type === 'incomingMessage'){
              return  <Message  username={message.username}  message={message.content} key={message.id} color={message.color}/>
            } else {
              return <Notification message={message.content}  key={message.id}/>
            }
          })
        }
       </main>
    );
  }
}
