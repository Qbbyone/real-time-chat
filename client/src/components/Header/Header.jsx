import React from 'react';

const Header = ({chatData}) => {
  return (
    <div>
      <div>Room name: {chatData.roomName} </div>
    </div>
  );
};

export default Header;