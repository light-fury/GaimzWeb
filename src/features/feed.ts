/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { feedData, streamerData } from 'src/utils/dummyData';
import { AppThunk } from './helpers';

export interface Streamer {
  id: string;
  name: string;
  icon: string;
  following: boolean;
  subscribed: boolean;
  online: boolean;
}
export interface Feed {
  user: Streamer;
  id: string;
  title: string;
  subTitle: string;
  sourceImg: string;
  viewerCount: string;
  isLive: boolean;
}

export interface FeedState {
  feedData: Feed[];
  isLoading: boolean;
  streamerData: Streamer[];
}

const initialState: FeedState = {
  feedData: [],
  isLoading: false,
  streamerData: [],
};

const feed = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    startFetching(state) {
      state.isLoading = true;
    },
    stopFetching(state) {
      state.isLoading = false;
    },
    feedLoaded(state, { payload }: PayloadAction<Feed[]>) {
      state.feedData = payload;
    },
    streamersLoaded(state, { payload }: PayloadAction<Streamer[]>) {
      state.streamerData = payload;
    },
  },
});

export const {
  startFetching,
  stopFetching,
  streamersLoaded,
  feedLoaded,
} = feed.actions;

export default feed.reducer;

export const loadFeed = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = { data: feedData };
    dispatch(feedLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};

export const loadStreamers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = { data: streamerData };
    dispatch(streamersLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};
