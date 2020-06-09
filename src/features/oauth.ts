/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from 'axios';
import setAuthToken from 'src/utils/setAuthToken';
import { createSlice } from '@reduxjs/toolkit';

import { createAlert } from './alert';
import { AppThunk } from './helpers';
import { userLoaded } from './authentication';


interface OAuthState {
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: OAuthState = {
  isLoading: false,
  isSuccess: false
};
declare const window: WindowLocalStorage;

const oauth = createSlice({
  name: 'oauth',
  initialState,
  reducers: {
    startFetching(state) {
      state.isLoading = true;
      setAuthToken(window.localStorage.getItem('token')); // let's make sure our auth token is added to the requests
    },
    stopFetching(state) {
      state.isLoading = false;
    },
    setSuccess(state) {
      state.isSuccess = true;
    }
  },
});

export const {
  startFetching,
  stopFetching,
  setSuccess
} = oauth.actions;

export default oauth.reducer;

export const addTwitch = (params: { [s: string]: string }): AppThunk => async (
  dispatch
) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = params;
  try {
    dispatch(startFetching());
    const response = await axios.post(
      'https://basicapi.gaimz.com/apps/twitch/code',
      body,
      config
    );
    dispatch(stopFetching());
    if (!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(userLoaded(response.data.user));
    setAuthToken(response.data.auth_token);
    dispatch(setSuccess());
  } catch (error) {
    dispatch(stopFetching());
    if (error.response) {
      dispatch(createAlert(error.response.data.message, 'danger'));
    } else {
      dispatch(createAlert('Something went wrong', 'danger'));
    }
  }
};


export const addSteam = (params: { [s: string]: string }): AppThunk => async (
  dispatch
) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  for (const k in params) { // we're using decamelization in rn app
    if (Object.prototype.hasOwnProperty.call(params, k)) {
      params[k.replace('.', '_')] = params[k];
      delete params[k];
    }
  }

  const body = params;
  try {
    dispatch(startFetching());
    const response = await axios.post(
      'https://basicapi.gaimz.com/apps/steam/account',
      body,
      config
    );
    dispatch(stopFetching());
    if (!response || !response.data.auth_token || !response.data.user) {
      throw new Error();
    }
    dispatch(userLoaded(response.data.user));
    setAuthToken(response.data.auth_token);
    dispatch(setSuccess());
  } catch (error) {
    dispatch(stopFetching());
    if (error.response) {
      dispatch(createAlert(error.response.data.message, 'danger'));
    } else {
      dispatch(createAlert('Something went wrong', 'danger'));
    }
  }
};
