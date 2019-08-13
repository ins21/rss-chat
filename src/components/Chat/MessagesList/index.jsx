import React, { Component } from 'react';
import * as moment from 'moment';
import './styles.css';


class MessagesList extends Component { 
  getMessages(arr) {
    if (arr.length === 0) return [];    

    const messages = arr.map(i => {
      return (
        <div key={i.id} className="message messages-container__message">
          <span className="message__author">{i.from}</span>
          <span className="message__date"> {moment(i.time).format('MMM Do, h:mm a')}</span>
          <p className="message__text">{i.message}</p>
        </div>
      );
    });    
    
    return messages
  }

  messagesContainer = React.createRef();

  updateScroll = () => {
    this.messagesContainer.current.scrollTop = this.messagesContainer.current.scrollHeight;
  }
 
  buttonClickHandler = () => {
    this.props.loadMoreMessages();
  }

  render() {
    const refactoredMessages = this.getMessages(this.props.messages);
    const button = this.props.loadMoreButton ? 'load-more_active' : 'load-more_disabled';

    return (
      <div ref={this.messagesContainer} className="messages-container">
        <button
          onClick={this.buttonClickHandler} 
          className={'messages-container__load-more ' + button}>Load more
        </button>
        {refactoredMessages}
      </div>
    )
  }
}

export default MessagesList