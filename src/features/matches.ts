/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './helpers';

export interface MatchResult {
  match_id: string;
  won: boolean;
  duration: number;
  type: 'Gaimz Match';
  user_id: string;
  hero_name: string;
  hero_avatar_url: string;
  kills: number;
  deaths: number;
  assists: number;
  items: string[];
  gpm: number;
  lasthits: number;
}

export interface MatchesState {
  recentMatchesData: MatchResult[];
  isLoading: boolean;
}

const initialState: MatchesState = {
  recentMatchesData: [],
  isLoading: false,
};

const matches = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    startFetching(state) {
      state.isLoading = true;
    },
    stopFetching(state) {
      state.isLoading = false;
    },
    recentMatchesLoaded(state, { payload }: PayloadAction<MatchResult[]>) {
      state.recentMatchesData = payload;
    },
  },
});

export const {
  startFetching,
  stopFetching,
  recentMatchesLoaded,
} = matches.actions;

export default matches.reducer;

export const loadRecentMatches = (userId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = await axios.get(`https://mmapi.gaimz.com/results/list/${userId}`);
    console.log(response);
    dispatch(recentMatchesLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};
