import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatListItem from './chatListItem.js';
import Message from './message.js';
import ChatBox from './chatBox.js';

const Chat = ({ token, user }) => {
  const [socket, setSocket] = useState(null);
  const [chatPartner, setChatPartner] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const connectSocket = () => {
      const ioSocket = io(process.env.REACT_APP_WS_URL, {
        auth: { token },
      });
  
      ioSocket.on('message', (msg) => {
        setMessages((prev) => ({
          ...prev,
          [msg.from]: prev[msg.from] ? [...prev[msg.from], msg] : [msg],
        }));
      });

      setSocket(ioSocket);
    }

    const fetchUsers = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
      });
      const data = await res.json();
      setChatUsers(data.users);
    };

    if (token) {
      connectSocket();
    }
    fetchUsers();
  }, []);

  return (
    <div className='chat-wrapper'>
      <div className='chat-list-cont'>
        <h1 className='chat-list-heading'>Chats</h1>
        <ul className='chat-list'>
          {
            chatUsers.map(({ _id, username }) => <ChatListItem key={_id} id={_id} username={username} setChatPartner={setChatPartner} selected={chatPartner === _id} user={user} />)
          }
        </ul>
      </div>

      <div className='chat-window'>
        {
          messages[chatPartner]?.map(({ id, text, from }) => <Message key={id} text={text} type={from === user ? 'sent' : 'received'} />)
        }

        <ChatBox socket={socket} setMessages={setMessages} chatPartner={chatPartner} user={user} />
      </div>
    </div>
  );
};

export default Chat;
