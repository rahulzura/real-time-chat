import React from 'react';

const SignUp = ({ setView }) => {
  const handleSignInClick = (e) => {
    e.preventDefault();
    setView('sign-in');
  }

  return <div className='sign-up-wrapper'>
    <div className='sign-up-cont'>
      <div className='input-group'>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
      </div>

      <div className='input-group'>
        <label htmlFor='password'>Password</label>
        <input type='text' id='password' />
      </div>

      <div className='input-group'>
        <button className='btn-primary' type='button'>Sign Up</button>
      </div>

      <a className='link-primary' onClick={handleSignInClick}>Already a member? Sign in</a>
    </div>
  </div>

};

export default SignUp;
