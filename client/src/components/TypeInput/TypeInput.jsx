import React, { useState } from "react";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

const TypeInput = (props) => {
  const chatData = props.chatData;
  const sendMessage = props.sendMessage;

  const [messageBody, setMessageBody] = useState("");

  const sendMessageButtonClick = () => {
    sendMessage(messageBody, chatData.roomId);
    setMessageBody('')
  };

  return (
    <div className="type-form">
      <button className="smile-btn">
        <SentimentSatisfiedOutlinedIcon fontSize="large" />
      </button>
      <input
        className="type-input"
        autoComplete="off"
        type="text"
        placeholder="Type a message..."
        value={messageBody}
        onChange={(event) => setMessageBody(event.target.value)}
        onKeyPress={event => event.key==='Enter' ? sendMessageButtonClick() : null}  
      />
      <button className="type-form-button" onClick={sendMessageButtonClick}>
        Send
      </button>
    </div>
  );
};

export default TypeInput;
