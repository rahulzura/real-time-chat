import React from 'react';

const Message = ({ type, text }) => {
  return (
    <div className={['message-cont', type === 'sent' ? 'sent-message-cont' : 'received-message-cont'].join(' ')}>
      <div className='message'>{text}</div>
    </div>
  )
};

export default Message;
