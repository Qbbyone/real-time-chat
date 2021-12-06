import React from 'react';

const MessageItem = () => {
  let isAdmin, isCurrentUser


  return isAdmin ? (
    <div className="admin-message">
      <p>Text</p>
    </div>
  ) : isCurrentUser ? (
    <div className="user-message right">
      <div className="message-info text-right">
        <span className="message-info-name">Name</span>
        <span className="message-info-time">08:50</span>
      </div>
      <div className="message-body right current-user-bg">
        <p className="message-text">Text</p>
      </div>
    </div>
  ) : (
    <div className="user-message">
      <div className="message-info">
        <span className="message-info-name">Name</span>
        <span className="message-info-time">08:50</span>
      </div>
      <div className="message-body left other-users-bg">
        <p className="message-text">Text</p>
      </div>
    </div>
  );
};

export default MessageItem;