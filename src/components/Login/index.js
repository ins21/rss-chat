import React, { Component } from 'react';
import Header from '../Header';
import './styles.css';


class Login extends Component {
  keyDownHandler = (e) => {
    const keyEnter = 13;
    if (e.keyCode === keyEnter) this.loginHandler();
  }

  loginHandler = () => {
    const input = document.querySelector('.login__user');
    if (input.value.replace(/ /g, '').length > 0) this.props.addUser(input.value);
  }

  render() {
    return (
      <section className="login">
        <Header />
        <input 
          onKeyDown={this.keyDownHandler} 
          className="login__user" 
          type="text" 
          placeholder="Enter your username" 
          maxLength="15" 
          autoFocus 
          required 
        />
        <div onClick={this.loginHandler} className="login__enter">Start chatting!</div>
      </section>
    )
  }
}

export default Login