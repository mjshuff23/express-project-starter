import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { loadToken } from '../../store/actions/authentication';
import { PrivateRoute, ProtectedRoute } from '../../route-utils';
import NavBar from '../NavBar/NavBar';
import LoginForm from '../LoginForm/LoginForm';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, [loadToken]);

  if (!loaded) return null;

  return (
    <div className='App'>
      <NavBar />
      <LoginForm />
    </div>
  );
}

const AppContainer = () => {
  // If there is a token, we don't need to login, making this false
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
