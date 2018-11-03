import React from 'react';
import PropTypes from 'prop-types';

export default {Message,Notification}


// Two functions that returns html message back to MessageList.
export  function Message({color,username,message}) {
   const spanStyle = {color: color};
    return(
      <div className="message">
        <span className="message-username" style={spanStyle}>{username}</span>
        <span className="message-content">{message}</span>
      </div>
   );
}
Message.propTypes = {
  message: PropTypes.string,
  username: PropTypes.string,
  color: PropTypes.string
};


export  function Notification({message}) {
    return(
      <div className="notification">
        <span className="notification-content">{message}</span>
      </div>
    )
}
Notification.propTypes = {
  message: PropTypes.string,
};
