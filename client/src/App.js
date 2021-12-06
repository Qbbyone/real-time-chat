import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.scss";
import Chat from "./pages/Chat/Chat";
import Welcome from "./pages/Welcome/Welcome";
import { useSocket } from "./hooks/socket.hook";

function App() {
  const [roomId, setRoomId] = useState("");

  const { chatData } = useSocket();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome chatData={chatData} roomId={roomId} />
        </Route>
        <Route path="/chat/:roomId">
          <Chat chatData={chatData} setRoomId={setRoomId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
