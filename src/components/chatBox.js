import React, { useState } from 'react';

const ChatBox = ({ socket, setMessages, chatPartner, user }) => {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    if (message && chatPartner && socket) {
      const msgObj = {
        id: Math.random().toString(36).substring(2, 10),
        text: message,
        from: user,
        to: chatPartner,
      };
      socket.emit('message', msgObj);
      setMessage('');
      setMessages((prev) => ({
        ...prev,
        [chatPartner]: prev[chatPartner] ? [...prev[chatPartner], msgObj] : [msgObj],
      }));
    }
  };

  return (
    <div className='chat-box'>
      <input className='chat-input' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className='send-btn' type='button' onClick={handleSendClick}>Send</button>
    </div>
  )
};

export default ChatBox;
