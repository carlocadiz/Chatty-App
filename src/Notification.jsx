import React, {Component} from 'react';

export default class Notitification extends React.Component {
  render(){
    return(

      <div className="notification">
        <span className="notification-content">{this.props.message}</span>
      </div>
    )
  }
}