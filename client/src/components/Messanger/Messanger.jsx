import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import MessageItem from '../MessageItem/MessageItem';

const Messanger = ({chatData}) => {
  //console.log("chatData in Messanger", chatData.messages);

  const messages =  chatData.messages

  return (
    <ScrollToBottom className="messenger">
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <MessageItem />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messanger;