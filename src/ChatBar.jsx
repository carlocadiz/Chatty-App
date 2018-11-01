
import React, {Component} from 'react';

export default class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state= {name: this.props.currentUser};
    this._handleChange = this._handleChange.bind(this);
    this._messageChange = this._messageChange.bind(this);

  }

  _messageChange = (e) => {

       this.setState( { content: e.target.value});
  }

 _handleChange = (e) => {

  //   if (e.target.value !== "" ? this.setState({name: e.target.value, type:'postNotification'})
  //   : this.setState({name: this.props.currentUser}));
  // }
    this.setState({name: e.target.value});
}
_onEnter = (e) => {

    if (e.key === 'Enter') {
      this.props.addMessage(this.state);
      e.target.value = "";
    }
  }

render(){
  return(

    <footer className="chatbar">
      <input onChange={this._handleChange} className="chatbar-username" placeholder={this.props.currentUser} />
      <input onKeyPress={this._onEnter}  onChange={this._messageChange} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>

   );
 };
}

