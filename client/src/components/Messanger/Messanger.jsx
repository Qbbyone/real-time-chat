import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from '../MessageItem/MessageItem';

const Messanger = ({messages}) => {
 
  return (
    <ScrollToBottom className="messenger">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <MessageItem message={message} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messanger;