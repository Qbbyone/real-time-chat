import { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket = io("http://localhost:3001");

export const useSocket = () => {
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connect");
    // });

    socket.on("chatData", (data) => {
      setChatData(data);
    });

    socket.on('userId', (userId) => {
      console.log("currentUserId in hook", userId)
      sessionStorage.setItem('userId', userId)
    })
  }, []);

  
  const createRoom = (username, roomName) => {
    socket.emit("createRoom", { username, roomName });
  };
  
  const reconnectToRoom = (userId) => {
    socket.emit("reconnect", userId);
  }

  return {
    chatData,
    createRoom,
    reconnectToRoom
  };
};
