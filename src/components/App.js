import React, { Fragment, Component } from 'react';
import Login from './Login/Login';
import Chat from './Chat/Chat';
import './styles.css';

class App extends Component {
  state = {
    user: null
  }

  addUser = (user) => {
    localStorage.setItem('user', user)
    this.setState({user});
  }

  logOut = () => {
    this.setState({user: null});
  }

  render() {
    return (
      <Fragment>
        { !this.state.user && !localStorage.getItem('user')
        ? <Login addUser={this.addUser} user={this.state.user} />
        : <Chat logOut={this.logOut} user={localStorage.getItem('user') || this.state.user} />
        }
      </Fragment>
    );
  }
}

export default App;
