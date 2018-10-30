import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component{


   render(){
     const oneMessage = this.props.messages.map(message => (
      <Message  username ={message.username}  message={message.content} key={message.key}/>
    ));

    return(

      <main className="messages">
        {oneMessage}
     </main>
   );
  }
}

export default MessageList;