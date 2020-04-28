import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { createAlert } from './alert';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: {}
};

const authentication = (state = initialState, action) => {
  switch(action.type) {
    case START_FETCHING:
      return {...state, isLoading: true }
    case STOP_FETCHING:
      return {...state, isLoading: false }
    case LOGIN_SUCCESS:
      return {...state, isAuthenticated: true }
    case LOGIN_FAILURE:
      return {...state, isAuthenticated: false }
    case LOAD_USER:
      return {...state, user: action.user }
    default:
      return state;
  }
}

const START_FETCHING = 'START_FETCHING';
const startFetching = () => {
  return {
    type: START_FETCHING
  }
}

const STOP_FETCHING = 'STOP_FETCHING';
const stopFetching = () => {
  return {
    type: STOP_FETCHING
  }
}

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

const LOGIN_FAILURE = 'LOGIN_FAILURE';
const loginFailure = () => {
  return {
    type: LOGIN_FAILURE
  }
}

const LOAD_USER = 'LOAD_USER';
const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user
  }
}

const login = (email, password) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify({ user_email: email, user_password: password });
  try {
    dispatch(startFetching());
    const response = await axios.post('https://basicapi.gaimz.com/login', body, config);
    if(!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(loginSuccess());
    dispatch(stopFetching());
    setAuthToken(response.data.auth_token);
    dispatch(loadUser(response.data.user));
    dispatch(createAlert(`Welcome back, ${response.data.user.user_name}`, 'success'));
  } catch (error) {
    dispatch(loginFailure());
    dispatch(stopFetching());
    const errorMessage = error.response ? error.response.data.message : 'Something went wrong';
    console.log(errorMessage);
    dispatch(createAlert(errorMessage, 'danger'));
  }
};

export {
  authentication,
  login
}
