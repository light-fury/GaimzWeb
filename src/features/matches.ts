/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { MatchResult, Game, MatchResponse, MatchRequestDTO, MatchStatus } from 'src/models/match-interfaces';
import { Epic } from 'redux-observable';
import { switchMap, takeUntil, exhaustMap, catchError, filter, /* tap */ } from 'rxjs/operators';
import { timer, from, of } from 'rxjs';
import { RootState } from 'src/app/rootReducer';
import { AppThunk } from './helpers';

const mmapiUrl = 'https://mmapi.gaimz.com';
const basicapiUrl = 'https://basicapi.gaimz.com';

export enum MatchmakingFlow {
  INITIAL_STATE = 'INITIAL_STATE',
  SEARCHING_FOR_MATCHES = 'SEARCHING_FOR_MATCHES',
  LOBBY_PASSWORD_REQUIRED = 'LOBBY_PASSWORD_REQUIRED',
  MATCH_FOUND_READY = 'MATCH_FOUND_READY',
  PREPARING_MATCH_LOBBY = 'PREPARING_MATCH_LOBBY',
  SENDING_INVITES = 'SENDING_INVITES',
  MATCH_IN_PROGRESS = 'MATCH_IN_PROGRESS',
  MATCH_END = 'MATCH_END'
}

export interface MatchesState {
  recentMatchesData: MatchResult[];
  gameData: Game;
  gamesData?: Game[];
  matchData: MatchResponse;
  isLoading: boolean;
  polling: boolean;
  matchMakingFlow: MatchmakingFlow;
  accepted: boolean;
}

const initialState: MatchesState = {
  recentMatchesData: [],
  isLoading: false,
  matchData: {},
  polling: false,
  gameData: { game_id: '', game_name: '', game_picture_url: '', success: false, game_types: [] },
  matchMakingFlow: MatchmakingFlow.INITIAL_STATE,
  accepted: false
};

function checkEquality(match1: MatchResponse, match2: MatchResponse) {
  return JSON.stringify(match1) === JSON.stringify(match2);
}

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
      if (checkEquality(state.matchData, payload)) { return; }
      state.matchData = payload;
      switch (payload.match_status) {
        case MatchStatus.MatchRequested:
          state.matchMakingFlow = MatchmakingFlow.SEARCHING_FOR_MATCHES;
          break;
        case MatchStatus.PlayersFound:
          if (state.accepted) {
            state.matchMakingFlow = MatchmakingFlow.PREPARING_MATCH_LOBBY;
          } else {
            state.matchMakingFlow = MatchmakingFlow.MATCH_FOUND_READY;
          }
          break;
        case MatchStatus.MatchAccepted:
          state.matchMakingFlow = MatchmakingFlow.PREPARING_MATCH_LOBBY;
          break;
        case MatchStatus.MatchCancelled:
          state.matchMakingFlow = MatchmakingFlow.INITIAL_STATE;
          break;
        case MatchStatus.InvitesSent:
          state.matchMakingFlow = MatchmakingFlow.SENDING_INVITES;
          break;
        case MatchStatus.MatchStarted:
          state.matchMakingFlow = MatchmakingFlow.MATCH_IN_PROGRESS;
          break;
        case MatchStatus.MatchEnded:
          state.matchMakingFlow = MatchmakingFlow.MATCH_END;
          break;
        default:
          break;
      }
    },
    pollStart(state) { state.polling = true; },
    pollStop(state) { state.polling = false; },
    acceptMatch(state) { state.accepted = true; }
  },
});

export const {
  startFetching,
  stopFetching,
  recentMatchesLoaded,
  gameLoaded,
  gamesLoaded,
  matchStarted,
  pollStart,
  pollStop,
  acceptMatch
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
    if (accept) { dispatch(acceptMatch()); }
    dispatch(matchStarted(response.data));
  } catch (error) {
    // eslint hates console.log - needs to go to pro logger (like sentry)
  } finally {
    dispatch(stopFetching());
  }
};

export const getMatchStatus = (matchId: string): AppThunk => async (dispatch) => {
  try {
    const response = (await axios.get(`${mmapiUrl}/match/${matchId}`));
    // console.log(response);
    dispatch(matchStarted(response.data));
  } catch (error) {
    // eslint hates console.log - needs to go to pro logger (like sentry)
  }
};

// eslint-disable-next-line max-len
export const pollEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) => action$
  .pipe(
    filter(matches.actions.pollStart.match),
    switchMap(() => timer(1000, 1000)
      .pipe(takeUntil(action$.pipe(filter(matches.actions.pollStop.match))))),
    exhaustMap(
      () => from(axios.get(`${mmapiUrl}/match/${state$.value.matches.matchData.match_id}`))
        .pipe(
          switchMap((res) => {
            if (res.data.match_status === MatchStatus.MatchCancelled) {
              return from([matchStarted(res.data), pollStop()]);
            }
            return of(matchStarted(res.data));
          }),
          catchError(() => of(matchStarted(state$.value.matches.matchData))),
        )
    )
  );
