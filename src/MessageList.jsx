import React, {Component} from 'react';
import Message from "./Message.jsx";

export default class MessageList extends Component{


   render(){
     const oneMessage = this.props.messages.map(message => (
      <Message  username ={message.username}  message={message.content} key={message.id}/>
    ));

    return(

      <main className="messages">
        {oneMessage}
     </main>
   );
  }
}

