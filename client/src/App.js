import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSocket } from "./hooks/socket.hook";
import "./styles/App.scss";
import Chat from "./pages/Chat/Chat";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const [roomId, setRoomId] = useState("");

  const { chatData } = useSocket();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!!chatData ? (
            <Redirect to={`/chat?roomId=${chatData.roomId}`} />
          ) : (
            <Welcome roomId={roomId} />
          )}
        </Route>
        <Route path="/chat"> {/* path="/chat/:roomId" */}
          <Chat chatData={chatData} setRoomId={setRoomId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
