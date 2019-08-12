import React, { Component } from 'react';
import Login from './Login/index';
import Chat from './Chat/index';
import './styles.css';


class App extends Component {
  state = {
    user: null
  }

  logIn = (user) => {
    localStorage.setItem('user', user)
    this.setState({user});
  }

  logOut = () => {
    this.setState({user: null});    
  }

  render() {
    return (
      <>
        {!this.state.user && !localStorage.getItem('user')
          ? <Login logIn={this.logIn} user={this.state.user} />
          : <Chat logOut={this.logOut} user={localStorage.getItem('user') || this.state.user} />
        }
      </>
    );
  }
}

export default App;
