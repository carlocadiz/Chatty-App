
import React, {Component} from 'react';

export default class Chatbar extends Component {

_onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage( e.target.value);
      e.target.value = "";
    }
  }

render(){
  return(

    <footer className="chatbar">
      <input className="chatbar-username" placeholder={this.props.currentUser} />
      <input onKeyPress={this._onEnter} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>

   );
 };
}

