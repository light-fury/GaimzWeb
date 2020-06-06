/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import setAuthToken from 'src/utils/setAuthToken';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createAlert } from './alert';
import { AppThunk } from './helpers';

interface AuthenticationState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserNestedObject | null;
}

interface User {
  twitch_token: string;
  auth_token: string;
  user: UserNestedObject;
  success: boolean;
  expiration_date_utc?: Date;
  expiration_timestamp_utc?: number;
  signup?: boolean;
}

interface UserNestedObject {
  user_id: string;
  user_name: string;
  user_role: UserRole;
  user_avatar_url: string;
  user_email: string;
  registered: Date;
  apps: AppsMap;
}
interface AppsMap {
  steam: boolean;
  twitch: boolean;
}
enum UserRole {
  ADMIN = 'Admin',
  BOT = 'Bot',
  STREAMER = 'Streamer',
  GAIMER = 'Gaimer',
}

declare const localStorage: any;
const initialState: AuthenticationState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

function setAuthenticated(state: AuthenticationState) {
  state.isAuthenticated = true;
}
function setNotAuthenticated(state: AuthenticationState) {
  state.isAuthenticated = false;
}
function logOut(state: AuthenticationState) {
  state.token = null;
  state.isAuthenticated = false;
  state.user = null;
}

const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    startFetching(state) {
      state.isLoading = true;
    },
    stopFetching(state) {
      state.isLoading = false;
    },
    userLoaded(state, { payload }: PayloadAction<UserNestedObject>) {
      state.isAuthenticated = true;
      state.user = payload;
    },
    loginSuccess: setAuthenticated,
    registerSuccess: setAuthenticated,
    loginFailure: setNotAuthenticated,
    registerFailure: setNotAuthenticated,
    authenticationError: logOut,
    logoutSuccess: logOut,
  },
});

export const {
  startFetching,
  stopFetching,
  userLoaded,
  loginSuccess,
  registerSuccess,
  loginFailure,
  registerFailure,
  authenticationError,
  logoutSuccess,
} = authentication.actions;

export default authentication.reducer;

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get('https://basicapi.gaimz.com/checktoken');
    dispatch(userLoaded(response.data.user));
  } catch (error) {
    dispatch(authenticationError());
  }
};

export const login = (email: string, password: string): AppThunk => async (
  dispatch
) => {
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
        error.response.data.message.forEach((e: any) => {
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

export const register = (
  name: string,
  email: string,
  password: string
): AppThunk => async (dispatch) => {
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
        error.response.data.message.forEach((e: any) => {
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

export const logout = (): AppThunk => (dispatch) => {
  setAuthToken(null);
  dispatch(logoutSuccess());
  dispatch(createAlert('You have been successfully logged out!', 'success'));
};
