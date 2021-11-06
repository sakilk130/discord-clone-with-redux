import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase/config';
function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://seeklogo.com/images/D/discord-logo-134E148657-seeklogo.com.png"
          alt="Logo"
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
