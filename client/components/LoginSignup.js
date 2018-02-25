import React, {Component} from 'react';
import {Login, Signup} from './auth-form';

const LoginSignup = () => {
  let login = true;
  return (
    <div style={{display: 'flex', margin: "5vh 25vw"}}>
      <div style={{width: '10vw'}}>
        <div> Login </div>
        <div> Signup </div>
      </div>
      <div style={{width: '40vw'}}>
        {
          !login ?
          <Login />
          :
          <Signup />
        }
      </div>
    </div>
  )
}
export default LoginSignup;
