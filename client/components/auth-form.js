import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formData: {
            email: '',
            password: '',
            uName: ''
        }
        };
    this.handleChange = this.handleChange.bind(this);
}

<<<<<<< HEAD
handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
}

render() {
    const { formData} = this.state;
    return (
        <ValidatorForm
            ref="form"
            name={this.props.name}
            onSubmit={this.props.handleSubmit} >
          {
            this.props.name == 'signup' &&
            <TextValidator
            style={'font-size: 16px; line-height: 24px; height: 72px; display: inline-block; position: relative; background-color: transparent; font-family: Roboto, sans-serif; transition: height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; cursor: auto;'}
                floatingLabelText="Name"
                onChange={this.handleChange}
                name="uName"
                value={formData.uName}
                validators={['required']}
                errorMessages={['this field is required']}
            />
          }
            <TextValidator
                floatingLabelText="Email"
                onChange={this.handleChange}
                name="email"
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <TextValidator
                floatingLabelText="Password"
                onChange={this.handleChange}
                name="password"
                value={formData.password}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <br />
            <button
                type="submit"
            >{this.props.displayName}
            </button>
        </ValidatorForm>
    );
  }
=======
  return (
    <div>
      <form id="login-form" onSubmit={handleSubmit} name={name}>
        {
          name === 'signup' &&
            <div>
              <label htmlFor="name"><small>Name</small></label>
              <input name="uName" type="text" />
            </div>
        }
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button style={{float: 'right'}} type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
>>>>>>> origin/master
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    uName: null,
    email: null,
    password: null
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const {uName, email, password} = evt.target
      uName ?
        dispatch(auth(email.value, password.value, formName))
      :
      dispatch(auth(email.value, password.value, formName, uName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
