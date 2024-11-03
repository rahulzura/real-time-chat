import React from 'react';

const ChatListItem = ({ id, username, setChatPartner, selected, user }) => {
  const usernameStr = `${username}${user === id ? ' (you)' : ''}`;
  const handleClick = () => {
    setChatPartner(id);
    document.title = usernameStr;
  };

  return <li className={selected ? 'selected' : ''} onClick={handleClick}>
    <p>{usernameStr}</p>
  </li>;
};

export default ChatListItem;
