import React from 'react';
import Logo from '../Logo/Logo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faSignOutAlt, faUserPlus, faVideo } from "@fortawesome/free-solid-svg-icons";

const Header = ({chatData}) => {
  let usersInRoom = chatData.usernames.length
  return (
    <div className="header">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-room-info">
        <div className="room-name">Room: {chatData.roomName}</div>
        <div className="room-members">{usersInRoom} {usersInRoom > 1 ? "members" : "member"}</div>
      </div>
      <div className="header-dropdown">
        <label htmlFor="dropdown" className="dropdown-button">
          <span>
            <FontAwesomeIcon icon={faEllipsisH} size="2x" />
          </span>
        </label>
        <input className="dropdown-checkbox" type="checkbox" id="dropdown" />
        <ul className="dropdown-menu">
          <li className="menu-item"><a href="#" className="menu-link"><FontAwesomeIcon icon={faVideo} className="fa-icon" /> Start videocall</a></li>
          <li className="menu-item"><a href="#" className="menu-link"><FontAwesomeIcon icon={faUserPlus} className="fa-icon"/> Users</a></li>
         
          <li className="menu-item"><a href="/" className="menu-link"><FontAwesomeIcon icon={faSignOutAlt} className="fa-icon"/> Log Out</a></li>
        </ul>
        
      </div>
    </div>
  );
};

export default Header;