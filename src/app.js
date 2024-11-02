import React, { useState } from 'react';
import Chat from './components/chat.js';
import SignUp from './components/signUp.js';
import SignIn from './components/signIn.js';

import './styles.css';

const App = () => {
  const [view, setView] = useState('sign-in');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return (
    <>
      {view === 'sign-in' ? <SignIn setView={setView} setToken={setToken} setUser={setUser} /> : null }
      {view === 'sign-up' ? <SignUp setView={setView} setToken={setToken} setUser={setUser} /> : null }
      {view === 'chat' ? <Chat token={token} user={user} /> : null }
    </>
  );
};

export default App;
