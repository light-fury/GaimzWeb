/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { feedData, streamerData, forYouFeedData } from 'src/utils/dummyData';
// import { Stream } from 'stream';
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

// new interface
export interface ForYouFeed {
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
  forYouFeedData: ForYouFeed[];
}

const initialState: FeedState = {
  // maybe discoverFeedData?
  feedData: [],
  isLoading: false,
  streamerData: [],
  // new line
  forYouFeedData: [],
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
    // new reducer
    forYouFeedLoaded(state, { payload }: PayloadAction<ForYouFeed[]>) {
      state.forYouFeedData = payload;
      console.log(state.forYouFeedData);
    }
  },
});

export const {
  startFetching,
  stopFetching,
  streamersLoaded,
  feedLoaded,
  // new action
  forYouFeedLoaded,
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
    // fetch call to https://discoverapi.gaimz.com/discover/foryou
    const response = { data: streamerData };
    dispatch(streamersLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};

export const loadForYouFeed = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = { data: forYouFeedData };
    dispatch(forYouFeedLoaded(response.data));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};
