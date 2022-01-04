import { backendUrl } from '../../config';

export const TOKEN_KEY = 'starter/authentication/TOKEN';
export const SET_TOKEN = 'starter/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'starter/authentication/REMOVE_TOKEN';
export const ADD_USER = 'starter/authentication/ADD_USER';

export const addUser = (user) => ({ type: ADD_USER, user });
export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
  // Attempt to get token from localStorage
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (token) {
    // If the token exists, grab the userId from localStorage
    const userId = window.localStorage.getItem('userId');
    // Set token in Redux store
    dispatch(setToken(token));

    // Fetch our user and add them to the Redux store
    const response = await fetch(`${backendUrl}/api/users/${userId}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(addUser(user));
    }
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`${backendUrl}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    // Set token and userId in localStorage
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem('userId', user.id);
    // Set token in Redux store
    dispatch(setToken(token));
  } else {
    const { error } = await response.json();
    return error;
  }
};

export const logout = () => async (dispatch) => {
  // Clear token and userId from localStorage
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem('userId');
  dispatch(removeToken());
  window.location.href = '/';
};

export const register =
  (username, email, password, confirmPassword) => async (dispatch) => {
    const response = await fetch(`api/users`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    if (response.ok) {
      const { token, user } = await response.json();
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem('userId', user.id);
      dispatch(setToken(token));
    } else {
      const { error } = await response.json();
      return error;
    }
  };
