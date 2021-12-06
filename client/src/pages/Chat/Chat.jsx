import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Messanger from "../../components/Messanger/Messanger";
import TypeInput from "../../components/TypeInput/TypeInput";
import { useSocket } from "../../hooks/socket.hook";
import { useHistory } from "react-router-dom";

const Chat = (props) => {
  const history = useHistory();

  const chatData = props.chatData
  let setRoomId = props.setRoomId;

  const { reconnectToRoom } = useSocket();

  useEffect(() => {
    console.log("useEffect in chat", chatData);
    // get roomId from url
    const url = window.location.href.split('/');
    if (url.length === 5) {
      setRoomId(url[4]);
    }

    // reconnect to room if the page is refreshed
    if (sessionStorage.getItem("userId") && !chatData) {
      reconnectToRoom(sessionStorage.getItem("userId"));
    } else if (!chatData) {
      console.log("history", chatData);
      history.push("/");
    }
  }, []);

  return chatData ? (
    <div className="chat">
      <div className="chat-container">
        <Header chatData={chatData} setChatData={props.setChatData} />
        <Messanger chatData={chatData} />
        <TypeInput />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Chat;
