import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSocket } from "./hooks/socket.hook";
import Chat from "./pages/Chat/Chat";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const [roomId, setRoomId] = useState("");
  
  const { chatData } = useSocket();
  
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (chatData) {
              const urlChat = `/chat/?roomId=${chatData.roomId}`;
              return <Redirect to={urlChat} />;
            }
            return <Welcome roomId={roomId} />;
          }}
        />

        <Route path="/chat">
          <Chat setRoomId={setRoomId} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
