import React, {Component} from 'react';
import {Login, Signup} from './auth-form';

class LoginSignup extends Component {
  constructor () {
    super();
    this.state = {
      login: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (evt) {
    evt.preventDefault();
    let into = evt.target.textContent === 'Login';
    this.setState({login: into});
    document.getElementsByClassName('tab active')[0].classList.remove('active');
    into ?
      document.getElementById('ltab').classList.add('active')
    :
    document.getElementById('stab').classList.add('active')
  }
  render () {
    return (
      <div className="tab-container">
        <div className="side-tabs">
        <div className="blank-tab" />
          <div id="ltab" className="tab active" onClick = {this.handleClick}>
            <div>Login</div>
          </div>
          <div id="stab" className="tab" onClick = {this.handleClick}>
            <div>Signup</div>
          </div>
          <div className="blank-ab" />
        </div>
        <div className="tab-content">
          {
            this.state.login ?
            <Login />
            :
            <Signup />
          }
        </div>
    </div>
  )}
}
export default LoginSignup;
