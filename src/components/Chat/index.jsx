import React, { Component } from 'react';
import Header from '../Header/index';
import MessagesList from './MessagesList/index';
import WriteMessage from './WriteMessage/index';
import './styles.css';


class Chat extends Component {
  state = {
    allMessages: [],
    lastMessages: [],
    loadMoreButton: null,
    chatStatus: 'offline'
  }
 
  webSocket = null;
  autoReconnect = null;
  tabNotification = null;

  componentDidMount = () => {
    this.connectToChat();
    if (Notification.permission === 'default') Notification.requestPermission();   
  }

  componentWillUnmount = () => { 
    this.webSocket.removeEventListener('close', this.checkConnection);
    this.webSocket.removeEventListener('error', this.checkConnection);
  } 

  logOut = () => {
    localStorage.removeItem('user');
    clearInterval(this.autoReconnect);
    this.setState({chatStatus: 'offline'});
    this.webSocket.close();
    this.props.logOut();
  }

  connectToChat = () => {  
    this.webSocket = new WebSocket('wss://wssproxy.herokuapp.com/');
    
    this.checkConnection();

    this.webSocket.onopen = () => {    
      this.setState({chatStatus: 'online'});
      if (this.state.allMessages.length > 50) this.setState({loadMoreButton: 'active'});
    }       

    this.webSocket.addEventListener('close', this.checkConnection);

    this.webSocket.addEventListener('error', this.checkConnection);    

    this.webSocket.onmessage = (e) => { 
      const data = JSON.parse(e.data);         
      if (this.state.allMessages.length === 0) this.setState({allMessages: data});
      const allMessages = this.state.allMessages;
      const lastMessages = this.state.lastMessages.length === 0 
        ? [...allMessages.slice(0, 50).reverse()]
        : [...this.state.lastMessages, ...data];
        
      this.setState({lastMessages});
      if (allMessages.length > 50) this.setState({loadMoreButton: 'active'});      
      if (this.refs.messagesContainer) this.refs.messagesContainer.updateScroll();
      if (document.hidden) this.startBrowserNotification();
      if (document.hidden && !this.tabNotification) this.startTabNotification();
    };
  }

  sendMessage = (msg) => {
    const message = {from: this.props.user, message: msg};
    const webSocketIsOpened = this.webSocket.readyState === 1;
    if (webSocketIsOpened) this.webSocket.send(JSON.stringify(message));    
  }

  loadMoreMessages = () => {
    const start = this.state.lastMessages.length;
    const end = this.state.allMessages.length > start + 50 ? start + 50 : this.state.allMessages.length; 
    const data = this.state.allMessages.slice(start, end).reverse();
    this.setState({lastMessages: [...data, ...this.state.lastMessages]});
    if (end === this.state.allMessages.length) this.setState({loadMoreButton: null});
  } 

  checkConnection = () => {    
    this.autoReconnect = setInterval(() => {
      const webSocketIsOpened = this.webSocket.readyState === 1;

      if (!webSocketIsOpened) {
        this.setState({chatStatus: 'offline', allMessages: [], lastMessages: [], loadMoreButton: null});
        clearInterval(this.autoReconnect);
        this.connectToChat();        
      } else {
        clearInterval(this.autoReconnect);        
      }
    }, 2000);
  }

  startBrowserNotification = () => {    
    if (Notification.permission === 'granted') {
      new Notification('RSS chat', {
      icon: 'https://yt3.ggpht.com/a/AGF-l7_XBv-WdGb5TSh9COVN7GK75B2NQrzAZmdhdw=s900-c-k-c0xffffffff-no-rj-mo',
      body: 'Hey there! You have at least 1 unread message in The Rolling Scopes School chat.',
      });     
    }
   }

   startTabNotification = () => {
    this.tabNotification = setInterval(() => {
      document.title = document.title === 'RSS chat' ? 'New message!' : 'RSS chat';

      if (!document.hidden) {
        clearInterval(this.tabNotification);
        document.title = 'RSS chat';
        this.tabNotification = null;
      }
    }, 200);
  }
 
  render() {
    return (      
      <>
        <Header user={this.props.user} logOut={this.logOut} chatStatus={this.state.chatStatus} />
        <main className="chat-room">
          <section className="chat chat-room__chat">
            <MessagesList 
              messages={this.state.lastMessages} 
              ref="messagesContainer" 
              loadMoreMessages={this.loadMoreMessages}
              loadMoreButton={this.state.loadMoreButton}
            />
            <WriteMessage sendMessage={this.sendMessage} />        
          </section>
        </main>
      </>
    )
  }
}

export default Chat