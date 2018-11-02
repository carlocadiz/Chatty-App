import React, {Component} from 'react';

export default class Message extends React.Component {


  render(){ const spanStyle = {color: this.props.color};

    return(

      <div className="message">
        <span className="message-username" style={spanStyle}>{this.props.username}</span>
        <span className="message-content">{this.props.message}</span>
      </div>
   );
  }
}

