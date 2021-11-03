import React, { useState, useEffect } from "react";
import { useSocket } from "../../hooks/socket.hook";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  //const [roomId, setRoomId] = useState("");

  const history = useHistory();

  const { chatData, createRoom } = useSocket();

  console.log("chatData in Welcome", chatData);


  useEffect(() => {
    if (chatData) {
      history.replace(`/chat/?roomId=${chatData.roomId}`);
    }
  }, [chatData]);

  const joinButtonClick = () => {
    if (username.length !== 0 && roomName !== 0) {
      createRoom(username, roomName);
    }
  };

  return (
    <div>
      <input
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        placeholder="room name"
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
      />
      <button onClick={joinButtonClick}>Join</button>
    </div>
  );
};

export default Welcome;
