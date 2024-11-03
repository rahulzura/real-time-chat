import React, { useState } from 'react';
import Chat from './components/chat.js';
import AuthForm from './components/authForm.js';

import './styles.css';

const App = () => {
  const [view, setView] = useState('sign-in');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return (
    <>
      {['sign-up', 'sign-in'].includes(view) ? <AuthForm view={view} setView={setView} setToken={setToken} setUser={setUser} /> : null }
      {view === 'chat' ? <Chat token={token} user={user} /> : null }
    </>
  );
};

export default App;
