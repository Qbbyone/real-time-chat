const express = require("express");
const http = require("http");
const cors = require("cors");
const { nanoid } = require("nanoid");

const { Server } = require("socket.io");
const { send } = require("process");

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

sendChatData = (address, roomId) => {
  console.log("roomId in sendChatData", roomId);
  address.emit("chatData", createChatData(roomId));
};

createChatData = (roomId) => {
  const chatData = {
    roomId,
    roomName: chatRoomsData.get(roomId).get("roomName"),
    usernames: [...chatRoomsData.get(roomId).get("users").values()],
    messages: [...chatRoomsData.get(roomId).get("messages")],
  };

  return chatData;
};

createUserMessage = (roomId, userId, messageBody) => {
  const message = {
    userName: chatRoomsData.get(roomId).get("users").get(userId),
    userId,
    date: new Date()
      .toTimeString()
      .split(" ")[0]
      .split(":")
      .slice(0, -1)
      .join(":"), // hh:mm format
    messageBody,
  };

  return message;
};

createAdminMessage = (userId, messageBody) => {
  const message = {
    userId,
    messageBody,
  };

  return message;
};

io.on("connection", (socket) => {
  console.log("connection--------------");

  socket.on("createRoom", ({ username, roomName }) => {
    const roomId = nanoid(10);
    const userId = nanoid(8);

    chatRoomsData.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
        ["roomName", roomName],
      ])
    );
    chatRoomsData.get(roomId).get("users").set(userId, username);

    socket.join(roomId);
    socket.emit("userId", userId);

    const message = createAdminMessage("admin0", `You joined the room`);
    chatRoomsData.get(roomId).get("messages").push(message);

    sendChatData(io, roomId);
  });

  socket.on("joinRoom", ({ username, roomId }) => {
    if (chatRoomsData.has(roomId)) {
      socket.join(roomId);
      const userId = nanoid(8);
      chatRoomsData.get(roomId).get("users").set(userId, username);
      socket.emit("userId", userId);
      const currentUser = chatRoomsData.get(roomId).get("users").get(userId);

      const message = createAdminMessage(
        "admin0",
        `User ${currentUser} joined the room`
      );
      chatRoomsData.get(roomId).get("messages").push(message);
      sendChatData(io, roomId);
    } else {
      console.log("room is not found");
    }
  });

  socket.on("reconnect", (userId) => {
    chatRoomsData.forEach((value, key) => {
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
    const message = createUserMessage(roomId, userId, messageBody);
    chatRoomsData.get(roomId).get("messages").push(message);
    sendChatData(io, roomId);
  });

  socket.on("disconnectUser", ({ userId, roomId }) => {
    socket.leave(roomId);
    const currentUser = chatRoomsData.get(roomId).get("users").get(userId);
    chatRoomsData.get(roomId).get("users").delete(userId);

    const message = createAdminMessage(
      "admin0",
      `User ${currentUser} left the room`
    );

    chatRoomsData.get(roomId).get("messages").push(message);
    sendChatData(socket.broadcast, roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
