
import React, {Component} from 'react';

export default class Chatbar extends Component {

  constructor(props) {
    super(props);
    this.state= {name: this.props.currentUser, content: ''};
    this._handleChange = this._handleChange.bind(this);
    this._messageChange = this._messageChange.bind(this);

  }

  _messageChange = (e) => {

       this.setState( { content: e.target.value});
  }

 _handleChange = (e) => {
     console.log(e.target.value.length)
     if (e.target.value.length > -1){
       this.setState({name: e.target.value});
     }
}
_onHandleEnter = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {

      this.props.addMessage(this.state);
      this.setState({content: ""});
      e.target.value = "";
    }
  }

_onEnter = (e) => {
    if (e.key === 'Enter' && this.state.content !== '') {
      this.props.addMessage(this.state);
      this.setState({content: ""});
      e.target.value = "";
    }
  }

render(){
  return(

    <footer className="chatbar">
      <input onKeyPress={this._onHandleEnter}  onChange={this._handleChange} className="chatbar-username" placeholder={this.props.currentUser} />
      <input onKeyPress={this._onEnter}  onChange={this._messageChange} className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>

   );
 };
}

