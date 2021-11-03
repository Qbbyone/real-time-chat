const express = require("express");
const http = require("http");
const cors = require("cors");
const { nanoid } = require("nanoid");

const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const chatRoomsData = new Map();

sendChatData = (socket, roomId) => {
  console.log(roomId);
  socket.emit("chatData", { 
    roomId, 
    roomName: chatRoomsData.get(roomId).get('roomName'),
    usernames: [...chatRoomsData.get(roomId).get('users').values()]
  });
};

io.on("connection", (socket) => {
  console.log("connection--------------");

  socket.on("createRoom", ({ username, roomName }) => {
    const roomId = nanoid(10);
    const userId = nanoid(8);

    chatRoomsData.set(roomId, new Map([["users", new Map()]]));

    chatRoomsData.get(roomId).set("roomName", roomName);
    chatRoomsData.get(roomId).get("users").set(userId, username);

    console.log("chatRoomsData", chatRoomsData);

    socket.join(roomId);
    sendChatData(socket, roomId);

    console.log("userId in createRoom", userId)

    socket.emit("userId", userId);
  });

  // socket.on("joinChat", ({ username, roomName }) => {
  //   socket.join(roomName);
  //   const user = { username, roomName };
  //   sendChatData(socket, roomName, user);
  // });

  socket.on("reconnect", (userId) => {
    chatRoomsData.forEach((value, key) => {
      console.log("value", value)
      console.log("value.get", value.get('users').has(userId))

      if(value.get('users').has(userId)) {
        socket.join(key);
        sendChatData(socket, key);
        return
      } else {
        console.log("not our user");
      }
    })
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
