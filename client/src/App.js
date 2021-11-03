import React from "react";
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
  const { chatData } = useSocket();
  console.log("chatData in App", chatData);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (chatData) {
              return <Redirect to="/chat" />;
            }
            return <Welcome />;
          }}
        />
        <Route path="/chat">
          <Chat chatData={chatData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
