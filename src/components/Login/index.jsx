import React, { Component } from 'react';
import Header from '../Header/index';
import './styles.css';


class Login extends Component {
  state = {
    value: ''
  }

  changeHandler = (e) => {
    this.setState({value: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.value.replace(/ /g, '').length > 0) this.props.logIn(this.state.value);
  }

  render() {
    return (
      <section className="login">
        <Header />
        <form onSubmit={this.submitHandler} className="login__form">        
          <input 
            type="text" 
            value={this.state.value} 
            onChange={this.changeHandler}
            className="login__user" 
            placeholder="Enter your username" 
            maxLength="15" 
            autoFocus 
            required 
          />          
          <input type="submit" value="Start chatting!" className="login__enter" />
        </form>
      </section>
    )
  }
}

export default Login