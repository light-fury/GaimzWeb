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

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const authentication = (state = initialState, action) => produce(state, (draft) => {
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
      draft.isAuthenticated = true;
      return draft;
    case LOGIN_FAILURE:
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
  const body = JSON.stringify({ user_email: email, user_password: password });
  try {
    dispatch(startFetching());
    const response = await axios.post('https://basicapi.gaimz.com/login', body, config);
    if (!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(loginSuccess());
    dispatch(stopFetching());
    setAuthToken(response.data.auth_token);
    dispatch(userLoaded(response.data.user));
    dispatch(createAlert(`Welcome back, ${response.data.user.user_name}`, 'success'));
  } catch (error) {
    dispatch(loginFailure());
    dispatch(stopFetching());
    const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
    console.log(errorMessage);
    dispatch(createAlert(errorMessage, 'danger'));
  }
};

const logout = () => (dispatch) => {
  setAuthToken();
  dispatch(logoutSuccess());
  dispatch(createAlert('You have been successfully logged out!', 'success'));
};

export {
  authentication,
  loadUser,
  login,
  logout,
};
