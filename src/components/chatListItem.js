import React from 'react';

const ChatListItem = ({ id, username, setChatPartner, selected, user }) => {
  return <li className={selected ? 'selected' : ''} onClick={() => setChatPartner(id)}>{`${username}${user === id ? ' (you)' : ''}`}</li>;
};

export default ChatListItem;
