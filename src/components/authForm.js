import React, { useState } from 'react';

const AuthForm = ({ view, setView, setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  
  const toggleSignUpSignIn = (e) => {
    e.preventDefault();
    setView(view === 'sign-up' ? 'sign-in' : 'sign-up');
    setErrMessage('');
  }

  const authenticate = async () => {
    setErrMessage('');
    if (!(username && password)) {
      setErrMessage('username and password are required');
      return;
    }

    try {
      let res;
      if (view === 'sign-up') {
        const body = { username, password };
        res = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        const encoded = btoa(`${username}:${password}`);
        const headers = {
          'Authorization': `Basic ${encoded}`,
        };
        res = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, { method: 'POST', headers });
      }

      const data = await res.json();
      
      if (res.status === 200) {
        setToken(data.token);
        setUser(data.id);
        setView('chat');
      } else {
        setErrMessage(data.err ?? 'Something went wrong');
      }
    } catch (err) {
      setErrMessage('Something went wrong');
      console.error(err);
    }
  };

  return <div className='auth-form-wrapper'>
    <div className='auth-form-cont'>
      <div className='input-group'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className='input-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {errMessage ? <p className='auth-error-message'>{errMessage}</p> : null}
      <div className='input-group'>
        <button className='btn-primary' type='button' onClick={authenticate}>{view === 'sign-up' ? 'Sign Up' : 'Sign In'}</button>
      </div>

      <a className='link-primary' onClick={toggleSignUpSignIn}>{view === 'sign-up' ? 'Already a member? Sign in' : 'Don\'t have an account? Sign up'}</a>
    </div>
  </div>

};

export default AuthForm;
