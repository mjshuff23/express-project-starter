import './LoginForm.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { login } from '../../store/actions/authentication';
import * as EmailValidator from 'email-validator';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicURL, setProfilePicURL] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!EmailValidator.validate(email)) {
      return alert('Please enter a valid email');
    }

    const error = await dispatch(login(email, password));

    if (error) return alert(error);

    return <Navigate to='/' />;
  };

  const updateValue = (value, event) => {
    const update = {
      email: setEmail(event.target.value),
      password: setPassword(event.target.value),
      confrimPassword: setConfirmPassword(event.target.value),
      
    };
      
  };

  return (
    <div className="signup-form__container">
      <h2 className="signup-form__header">Login</h2>
      <form onSubmit={handleSubmit} className="signup-form__form">
        <label htmlFor="email" className="signup-form__input">
          Email:
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              updateValue("email", event);
            }}
          />
        </label>
        <div className="signupForm__invalidEmail">Invalid Email</div>
        <label htmlFor="password" className="signup-form__input">
          Password:
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => updateValue("password", event)}
          />
        </label>
        <label htmlFor="password" className="signup-form__input">
          Confirm Password:
          <input
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => updateValue("confrimPassword", event)}
          />
        </label>
        <div className="signupForm__invalidPassword">Invalid Password</div>
        <div className="signup-form__button-div">
          <button className="signupForm__button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
