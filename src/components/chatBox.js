import React, { useRef, useState } from 'react';

const ChatBox = ({ socket, setMessages, chatPartner, user }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const send = () => {
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

  const handleSendClick = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    send();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  return (
    <div className='chat-box'>
      <input ref={inputRef} placeholder='Type a message...' className='chat-box-input' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
      <div className='send-btn' type='button' onClick={handleSendClick}></div>
    </div>
  )
};

export default ChatBox;
