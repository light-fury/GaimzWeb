/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { recentMatchesData } from 'src/utils/dummyData';
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

export const loadRecentMatches = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = { data: recentMatchesData };
    dispatch(recentMatchesLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};
