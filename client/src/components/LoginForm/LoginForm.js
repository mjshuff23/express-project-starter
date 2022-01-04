import './LoginForm.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { login } from '../../store/actions/authentication';
import * as EmailValidator from 'email-validator';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    value === 'email'
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  };

  return (
    <div className='login-form__container'>
      <h2 className='login-form__header'>Login</h2>
      <form onSubmit={handleSubmit} className='login-form__form'>
        <label htmlFor='email'>
          Email:
          <input
            required
            type='email'
            className='login-form__input'
            placeholder='Email'
            value={email}
            onChange={(event) => {
              updateValue('email', event);
            }}
          />
        </label>
        <div className='loginForm__invalidEmail'>Invalid Email</div>
        <label htmlFor='password'>
          <input
            className='loginForm__input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => updateValue('password', event)}
          />
        </label>
        <div className='loginForm__invalidPassword'>Invalid Password</div>
        <button className='loginForm__button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
