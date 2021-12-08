import React from "react";

const MessageItem = ({ message }) => {
  let isAdmin, isCurrentUser;

  if (message.userId === "admin0") isAdmin = true;
  if (message.userId === sessionStorage.getItem("userId")) isCurrentUser = true;

  return isAdmin ? (
    <div className="admin-message">
      <p>{message.messageBody}</p>
    </div>
  ) : isCurrentUser ? (
    <div className="user-message right">
      <div className="message-info text-right">
        <span className="message-info-name">{message.userName}</span>
        <span className="message-info-time">{message.date}</span>
      </div>
      <div className="message-body right current-user-bg">
        <p className="message-text">{message.messageBody}</p>
      </div>
    </div>
  ) : (
    <div className="user-message">
      <div className="message-info">
        <span className="message-info-name">{message.userName}</span>
        <span className="message-info-time">{message.date}</span>
      </div>
      <div className="message-body left other-users-bg">
        <p className="message-text">{message.messageBody}</p>
      </div>
    </div>
  );
};

export default MessageItem;
