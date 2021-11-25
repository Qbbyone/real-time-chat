import React, { useState } from "react";
import { useSocket } from "../../hooks/socket.hook";

const Welcome = ({ roomId }) => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const { joinRoom, createRoom } = useSocket();

  const joinButtonClick = () => {
    if (roomId) {
      if (username.length !== 0) joinRoom(username, roomId);
    } else {
      if (username.length !== 0 && roomName !== 0)
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
      {!roomId && (
        <input
          placeholder="room name"
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
      )}
      <button onClick={joinButtonClick}>Join</button>
    </div>
  );
};

export default Welcome;
