import React from 'react';
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

const TypeInput = () => {
  return (
    <div className="type-form">
      <button className="smile-btn"><SentimentSatisfiedOutlinedIcon fontSize="large"/></button>
      <input
        className="type-input"
        autoComplete="off"
        type="text"
        placeholder="Type a message..."
        id="type-input"
        /* value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key==='Enter' ? sendMessage(event) : null} */
      />
      <button className="type-form-button">Send</button>
    </div>
  );
};

export default TypeInput;