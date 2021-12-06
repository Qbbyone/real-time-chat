import React, { useState, useEffect } from "react";
import { useSocket } from "../../hooks/socket.hook";
import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faSignOutAlt,
  faUserPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ chatData }) => {
  const [usernames, setUsernames] = useState(chatData.usernames);

  const { disconnectUser, userLeft } = useSocket();

  let usersInRoom = usernames.length;

  useEffect(() => {
    if (userLeft) {
      setUsernames((users) => users.splice(users.indexOf(userLeft), 1));
    }
  }, [userLeft]);

  // error redirect to chat
  const logoutButtonClick = () => {
    disconnectUser(sessionStorage.getItem("userId"), chatData.roomId);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-room-info">
        <div className="room-name">Room: {chatData.roomName}</div>
        <div className="room-members">
          {usersInRoom} {usersInRoom > 1 ? "members" : "member"}
        </div>
      </div>
      <div className="header-dropdown">
        <label htmlFor="dropdown" className="dropdown-button">
          <span>
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </span>
        </label>
        <input className="dropdown-checkbox" type="checkbox" id="dropdown" />
        <ul className="dropdown-menu">
          <li className="menu-item">
            <button className="menu-button">
              <FontAwesomeIcon icon={faVideo} className="fa-icon" /> Start
              videocall
            </button>
          </li>
          <li className="menu-item">
            <button className="menu-button">
              <FontAwesomeIcon icon={faUserPlus} className="fa-icon" /> Users
            </button>
          </li>
          {/* User logout */}
          <li className="menu-item">
            <a href='/' className="menu-link" onClick={logoutButtonClick}>
              <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" />
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
