/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchesState, MatchResult, Game, MatchResponse, MatchRequestDTO } from 'src/models/match-interfaces';
import { AppThunk } from './helpers';

const mmapiUrl = 'https://mmapi.gaimz.com';
const basicapiUrl = 'https://basicapi.gaimz.com';


const initialState: MatchesState = {
  recentMatchesData: [],
  isLoading: false,
  matchData: {},
  gameData: { game_id: '', game_name: '', game_picture_url: '', success: false, game_types: [] }
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
    gameLoaded(state, { payload }: PayloadAction<Game>) {
      state.gameData = payload;
    },
    gamesLoaded(state, { payload }: PayloadAction<Game[]>) {
      state.gamesData = payload;
    },
    matchStarted(state, { payload }: PayloadAction<MatchResponse>) {
      state.matchData = payload;
    }
  },
});

export const {
  startFetching,
  stopFetching,
  recentMatchesLoaded,
  gameLoaded,
  gamesLoaded,
  matchStarted
} = matches.actions;

export default matches.reducer;

export const loadRecentMatches = (userId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = await axios.get(`${mmapiUrl}/results/list/${userId}`);
    // console.log(response);
    dispatch(recentMatchesLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};

export const loadGame = (gameId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const games = (await axios.get(`${basicapiUrl}/games`)).data as Game[];
    // console.log(response);
    dispatch(gamesLoaded(games));
    dispatch(gameLoaded((games.find((g) => g.game_id === gameId)) as Game));
  } catch (error) {
    // eslint hates console.log - needs to go to pro logger (like sentry)
  } finally {
    dispatch(stopFetching());
  }
};

export const findMatch = (matchRequestDTO: MatchRequestDTO): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = await axios.post(`${mmapiUrl}/match`, matchRequestDTO);
    dispatch(matchStarted(response.data));
    // dispatch(recentMatchesLoaded(response.data));
  } catch (error) {
    // log an error here
  } finally {
    dispatch(stopFetching());
  }
};

export const updateMatch = (matchId: string, accept: boolean): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = (await axios.put(`${mmapiUrl}/match/${matchId}`, { accept_match: accept }));
    // console.log(response);
    dispatch(matchStarted(response.data));
  } catch (error) {
    // eslint hates console.log - needs to go to pro logger (like sentry)
  } finally {
    dispatch(stopFetching());
  }
};

export const getMatchStatus = (matchId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = (await axios.get(`${mmapiUrl}/match/${matchId}`));
    // console.log(response);
    dispatch(matchStarted(response.data));
  } catch (error) {
    // eslint hates console.log - needs to go to pro logger (like sentry)
  } finally {
    dispatch(stopFetching());
  }
};
