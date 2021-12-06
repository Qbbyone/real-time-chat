import { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket = io("http://localhost:3001");

export const useSocket = () => {
  const [chatData, setChatData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userLeft, setUserLeft] = useState("");

  useEffect(() => {
    //socket.on("connect", () => console.log("connect"))

    socket.on("chatData", (data) => setChatData(data));

    socket.on("userId", (userId) => {
      console.log("currentUserId in hook", userId);
      sessionStorage.setItem("userId", userId);
    });

    socket.on("newMessage", ({ message }) => setNewMessage(message));

    socket.on("userDisconnect", (username) => setUserLeft(username));
  }, []);

  const joinRoom = (username, roomId) => {
    socket.emit("joinRoom", { username, roomId });
  };

  const createRoom = (username, roomName) => {
    socket.emit("createRoom", { username, roomName });
  };

  const reconnectToRoom = (userId) => {
    socket.emit("reconnect", userId);
  };

  const sendMessage = (messageBody, roomId) => {
    const userId = sessionStorage.getItem("userId");
    socket.emit("sendMessage", { messageBody, roomId, userId });
  };

  const disconnectUser = (userId, roomId) => {
    socket.emit("disconnectUser", { userId, roomId });
  };

  const clearChatData = () => {
    console.log("clearChatData");
    setChatData(null)
  }

  return {
    chatData,
    joinRoom,
    createRoom,
    reconnectToRoom,
    sendMessage,
    disconnectUser,
    userLeft,
    clearChatData
  };
};
