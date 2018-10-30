
import React, {Component} from 'react';

export default class Chatbar extends Component {
render(){

  return(

    <footer className="chatbar">
      <input className="chatbar-username" placeholder={this.props.currentUser} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>

   );
 };
}

