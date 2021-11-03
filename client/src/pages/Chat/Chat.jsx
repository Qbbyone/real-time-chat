import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Messanger from "../../components/Messanger/Messanger";
import TypeInput from "../../components/TypeInput/TypeInput";
import { useSocket } from "../../hooks/socket.hook";
import { useHistory } from "react-router-dom";

const Chat = ({ chatData }) => {
  const history = useHistory();

  const {reconnectToRoom} = useSocket()

  useEffect(() => {
    if (sessionStorage.getItem("userId") && !chatData) {
      reconnectToRoom(sessionStorage.getItem("userId"));
    } else if (!chatData) {
      history.push("/");
    } 
  }, []);

  return (
    <div>
      <Header chatData={chatData} />
      <Messanger />
      <TypeInput />
    </div>
  );
};

export default Chat;
