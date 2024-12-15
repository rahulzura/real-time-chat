import React, { useEffect, useState } from 'react';
import ChatListItem from './chatListItem.js';
import Message from './message.js';
import ChatBox from './chatBox.js';

const Chat = ({ token, user, socket, messages, setMessages }) => {
  const [chatPartner, setChatPartner] = useState('');
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await res.json();
      setChatUsers(data.users);
    };

    fetchUsers();
  }, []);

  return (
    <div className='chat-wrapper'>
      <div className='chat-cont'>
        <div className='chat-list-cont'>
          <h1 className='chat-list-heading'>Chats</h1>
          <ul className='chat-list'>
            {
              chatUsers.map(({ id, username }) => <ChatListItem key={id} id={id} username={username} setChatPartner={setChatPartner} selected={chatPartner === id} user={user} />)
            }
          </ul>
        </div>

        <div className='chat-window'>
          {
            messages[chatPartner]?.map(({ id, text, from }) => <Message key={id} text={text} type={from === user ? 'sent' : 'received'} />)
          }

          {
            chatPartner ? <ChatBox socket={socket} setMessages={setMessages} chatPartner={chatPartner} user={user} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default Chat;
