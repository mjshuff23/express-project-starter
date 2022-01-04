import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { loadToken } from '../../store/actions/authentication';
import { PrivateRoute, ProtectedRoute } from '../../route-utils';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, [loadToken]);

  if (!loaded) return null;

  return <div className='App'>Test</div>;
}

const AppContainer = () => {
  // If there is a token, we don't need to login, making this false
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
