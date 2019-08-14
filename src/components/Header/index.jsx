import React, { Component } from 'react';
import './styles.css';


class Header extends Component {
  logOutHandler = (e) => {
    if (!e.target.classList.contains('chat-status')) this.props.logOut();   
  }

  render() {
    const status = `chat-status chat-status_${this.props.chatStatus}`;
    const greeting = 'Welcome to The Rolling Scopes School chat';
    const content = this.props.user
      ? <>Hello, <span className="welcome__name">{this.props.user} </span>! {greeting} </>
      : <>{greeting}<span className="welcome__login_mobile">RSS chat</span> </>;    

    return (
      <header className="header">
        <h2 className="welcome header__welcome">{content}</h2>
        {this.props.user && (
          <div onClick={this.logOutHandler} className="logout header__logout">
            <span className={status} title={'Chat status: ' + this.props.chatStatus}></span>Log out
            <img className="logout__img" src={require('./assets/images/logout.png')} alt="Log Out" />            
          </div>
        )}              
      </header> 
    )
  }
}

export default Header