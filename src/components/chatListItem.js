import React from 'react';

const ChatListItem = ({ id, username, setChatPartner, selected, user }) => {
  return <li className={selected ? 'selected' : ''} onClick={() => setChatPartner(id)}>
    <p>{`${username}${user === id ? ' (you)' : ''}`}</p>
  </li>;
};

export default ChatListItem;
