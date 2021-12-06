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
    roomName: chatRoomsData.get(roomId).get("roomName"),
    usernames: [...chatRoomsData.get(roomId).get("users").values()],
    messages: [...chatRoomsData.get(roomId).get("messages")],
  });
};

io.on("connection", (socket) => {
  console.log("connection--------------", Date.now());

  socket.on("createRoom", ({ username, roomName }) => {
    const roomId = nanoid(10);
    const userId = nanoid(8);

    chatRoomsData.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );

    chatRoomsData.get(roomId).set("roomName", roomName);
    chatRoomsData.get(roomId).get("users").set(userId, username);
    chatRoomsData.get(roomId).set("messages", []);

    socket.join(roomId);
    socket.emit("userId", userId);
    sendChatData(socket, roomId);
  });

  socket.on("joinRoom", ({ username, roomId }) => {
    if (chatRoomsData.has(roomId)) {
      socket.join(roomId);
      const userId = nanoid(8);
      chatRoomsData.get(roomId).get("users").set(userId, username);
      socket.emit("userId", userId);
      sendChatData(socket, roomId);
    } else {
      console.log("room is not found");
    }
  });

  socket.on("reconnect", (userId) => {
    chatRoomsData.forEach((value, key) => {
      console.log("value", value);
      console.log("value.get", value.get("users").has(userId));

      if (value.get("users").has(userId)) {
        socket.join(key);
        sendChatData(socket, key);
        return;
      } else {
        console.log("not our user");
      }
    });
  });

  socket.on("sendMessage", ({ messageBody, roomId, userId }) => {
    const message = {
      userName: chatRooms.get(roomId).get("users").get(userId),
      date: new Date().toTimeString().split(" ")[0], // hh:mm format
      messageBody,
    };

    chatRoomsData.get(roomId).get("messages").push(message);

    io.in(roomId).emit("newMessage", { message });
  });

  socket.on("disconnectUser", ({ userId, roomId }) => {
    socket.leave(roomId);
    socket.broadcast
      .to(roomId)
      .emit("userDisconnect", chatRoomsData.get(roomId).get("users").get(userId));

    chatRoomsData.get(roomId).get("users").delete(userId);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
