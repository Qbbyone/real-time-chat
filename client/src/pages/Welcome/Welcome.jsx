import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
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
    <div className="join">
      <div className="join-container">
        <div className="join-logo">
          <Logo />
        </div>
        <div className="join-heading">
          <h1>Sign in</h1>
          {/* <span>create new chat room</span> */}
        </div>
        <div className="join-form">
          <input
            className="join-input"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {!roomId && (
            <input
              className="join-input"
              placeholder="Room name"
              type="text"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          )}
          <button className="join-button" onClick={joinButtonClick}>
            {roomId ? "Join Chat" : "Create Room"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
