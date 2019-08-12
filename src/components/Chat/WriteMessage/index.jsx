import React, { Component } from 'react';
import './styles.css';


class WriteMessage extends Component {
  state = {
    value: ''
  }

  changeHandler = (e) => {
    this.setState({value: e.target.value});
  }

  keyDownHandler = (e) => {
    const keyEnter = 13;
    if (e.keyCode === keyEnter) {
      e.preventDefault();
      this.submitHandler(e);
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="user-message">          
        <textarea 
          value={this.state.value} 
          onChange={this.changeHandler}
          onKeyDown={this.keyDownHandler}
          className="user-message__textarea" 
          rows="2" 
          placeholder="Type your message ..."
        />          
        <input type="submit" className="user-message__send" title="Send" />
      </form>
    )
  }
}

export default WriteMessage