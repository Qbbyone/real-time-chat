import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Messanger from "../../components/Messanger/Messanger";
import TypeInput from "../../components/TypeInput/TypeInput";
import { useSocket } from "../../hooks/socket.hook";
import { useHistory } from "react-router-dom";

const Chat = ({ setRoomId }) => {
  const history = useHistory();

  const { chatData, reconnectToRoom } = useSocket();

  useEffect(() => {
    // get roomId from url
    const url = window.location.href;
    if (url.includes("roomId=")) {
      setRoomId(url.substring(url.indexOf("roomId=") + 7));
    }

    // reconnect to room if the page is refreshed
    if (sessionStorage.getItem("userId") && !chatData) {
      console.log("chat userId", sessionStorage.getItem("userId"));
      reconnectToRoom(sessionStorage.getItem("userId"));
    } else if (!chatData) {
      history.push("/");
    }
  }, []);

  return chatData ? (
    <div className="chat">
      <div className="chat-container">
        <Header chatData={chatData} />
        <Messanger />
        <TypeInput />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Chat;
