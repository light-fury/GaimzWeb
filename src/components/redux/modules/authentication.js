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
    case LOGIN_SUCCESS:
      return {...state, isAuthenticated: true, isLoading: false }
    case LOGIN_FAILURE:
      return {...state, isAuthenticated: false, isLoading: false }
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
    dispatch(loginSuccess());
    setAuthToken(response.data.auth_token);
    dispatch(loadUser(response.data.user));
    dispatch(createAlert(`Welcome back, ${response.data.user.user_name}`, 'success'));
  } catch (error) {
    const errorMessage = error.response.data.message;
    if (errorMessage) {
      console.log(errorMessage);
    }
    dispatch(loginFailure());
    dispatch(createAlert('Invalid Credentials', 'danger'));
  }
};

export {
  authentication,
  login
}
