import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from '../MessageItem/MessageItem';

const Messanger = () => {

  let messages = []
  let name = ''

  
  return (
    <ScrollToBottom className="messenger">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <MessageItem message={message} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messanger;