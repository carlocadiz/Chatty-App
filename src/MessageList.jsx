import React from 'react';
import {Message, Notification} from './Message.jsx';
import PropTypes from 'prop-types';

// function used to display all messages in the message screen. Props received from App.js are passed to two helper functions
// dependant on the message type.
export default function MessageList(props){

    return(

      <main className="messages">
        {
          props.messages.map(message => {
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
MessageList.propTypes = {
  messages: PropTypes.object
};
