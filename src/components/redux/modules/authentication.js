import axios from 'axios';
import produce from 'immer';
import setAuthToken from '../../utils/setAuthToken';
import { createAlert } from './alert';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const START_FETCHING = 'START_FETCHING';
const startFetching = () => ({
  type: START_FETCHING,
});

const STOP_FETCHING = 'STOP_FETCHING';
const stopFetching = () => ({
  type: STOP_FETCHING,
});

const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
const authenticationError = () => ({
  type: AUTHENTICATION_ERROR,
});

const USER_LOADED = 'USER_LOADED';
const userLoaded = (user) => ({
  type: USER_LOADED,
  user,
});

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

const LOGIN_FAILURE = 'LOGIN_FAILURE';
const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

const REGISTER_FAILURE = 'REGISTER_FAILURE';
const registerFailure = () => ({
  type: REGISTER_FAILURE,
});

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const authentication = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case START_FETCHING:
        draft.isLoading = true;
        return draft;
      case STOP_FETCHING:
        draft.isLoading = false;
        return draft;
      case USER_LOADED:
        draft.isAuthenticated = true;
        draft.user = action.user;
        return draft;
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        draft.isAuthenticated = true;
        return draft;
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        draft.isAuthenticated = false;
        return draft;
      case AUTHENTICATION_ERROR:
      case LOGOUT_SUCCESS:
        draft.token = null;
        draft.isAuthenticated = false;
        draft.user = null;
        return draft;
      default:
        return state;
    }
  });

const loadUser = () => async (dispatch) => {
  try {
    const response = await axios.get('https://basicapi.gaimz.com/checktoken');
    dispatch(userLoaded(response.data.user));
  } catch (error) {
    dispatch(authenticationError());
  }
};

const login = (email, password) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({
    user_email: email,
    user_password: password,
  });
  try {
    dispatch(startFetching());
    const response = await axios.post(
      'https://basicapi.gaimz.com/login',
      body,
      config
    );
    dispatch(stopFetching());
    if (!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(loginSuccess());
    setAuthToken(response.data.auth_token);
    dispatch(userLoaded(response.data.user));
    dispatch(
      createAlert(`Welcome back, ${response.data.user.user_name}`, 'success')
    );
  } catch (error) {
    dispatch(stopFetching());
    dispatch(loginFailure());
    if (error.response) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((e) => {
          console.log(e.constraints.isUniqueProperty);
          dispatch(createAlert(e.constraints.isUniqueProperty, 'danger'));
        });
      } else {
        console.log(error.response.data.message);
        dispatch(createAlert(error.response.data.message, 'danger'));
      }
    } else {
      dispatch(createAlert('Something went wrong', 'danger'));
    }
  }
};

const register = (name, email, password) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({
    user_name: name,
    user_email: email,
    user_password: password,
    user_password_confirm: password,
    captcha: 'captcha',
  });
  try {
    dispatch(startFetching());
    const response = await axios.post(
      'https://basicapi.gaimz.com/signup',
      body,
      config
    );
    dispatch(stopFetching());
    if (!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(registerSuccess());
    setAuthToken(response.data.auth_token);
    dispatch(userLoaded(response.data.user));
    dispatch(
      createAlert(`Welcome, ${response.data.user.user_name}`, 'success')
    );
  } catch (error) {
    dispatch(stopFetching());
    dispatch(registerFailure());
    if (error.response) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((e) => {
          console.log(e.constraints.isUniqueProperty);
          dispatch(createAlert(e.constraints.isUniqueProperty, 'danger'));
        });
      } else {
        console.log(error.response.data.message);
        dispatch(createAlert(error.response.data.message, 'danger'));
      }
    } else {
      dispatch(createAlert('Something went wrong', 'danger'));
    }
  }
};

const logout = () => (dispatch) => {
  setAuthToken();
  dispatch(logoutSuccess());
  dispatch(createAlert('You have been successfully logged out!', 'success'));
};

export { authentication, loadUser, login, register, logout };
