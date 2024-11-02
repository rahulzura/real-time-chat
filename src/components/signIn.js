import React, { useState } from 'react';

const SignIn = ({ setView, setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUpClick = (e) => {
    e.preventDefault();
    setView('sign-up');
  }

  const signIn = async () => {
    if (!(username && password)) {
      console.error('username and password are required');
    }

    const encoded = btoa(`${username}:${password}`);
    const headers = {
      'Authorization': `Basic ${encoded}`,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, { method: 'POST', headers });
      const data = await res.json();
      setToken(data.token);
      setUser(data.id);
      setView('chat');
    } catch (err) {
      console.error(err);
    }
  };

  return <div className='sign-up-wrapper'>
    <div className='sign-up-cont'>
      <div className='input-group'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className='input-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className='input-group'>
        <button className='btn-primary' type='button' onClick={signIn}>Sign In</button>
      </div>

      <a className='link-primary' onClick={handleSignUpClick}>Don't have an account? Sign up</a>
    </div>
  </div>

};

export default SignIn;
