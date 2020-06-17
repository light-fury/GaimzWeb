/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { feedData, streamerData } from 'src/utils/dummyData';
import axios from 'axios';
import { AppThunk } from './helpers';

export interface Streamer {
  id: string;
  name: string;
  icon: string;
  following: boolean;
  subscribed: boolean;
  online: boolean;
}

export interface CurrentStreamer {
  user_id: string;
  user_name: string;
  twitch_title: string;
  user_avatar_url: string;
  twitch_thumbnail_url: string;
  twitch_viewer_count: string;
  twitch_account_name: boolean;
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

export interface ForYouFeed {
  user_id: string;
  user_name: string;
  twitch_title: string;
  user_avatar_url: string;
  twitch_thumbnail_url: string;
  twitch_viewer_count: string;
  twitch_account_name: boolean;
}

export interface FeedState {
  feedData: Feed[];
  isLoading: boolean;
  streamerData: Streamer[];
  forYouFeedData: ForYouFeed[];
  currentStreamer?: CurrentStreamer;
}

const initialState: FeedState = {
  feedData: [],
  isLoading: false,
  streamerData: [],
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
    forYouFeedLoaded(state, { payload }: PayloadAction<ForYouFeed[]>) {
      payload.forEach((element) => {
        element.twitch_thumbnail_url = element.twitch_thumbnail_url.replace('{width}', '400').replace('{height}', '200');
      });
      state.forYouFeedData = payload;
    },
    currentStreamerLoaded(state, { payload }: PayloadAction<CurrentStreamer>) {
      state.currentStreamer = payload;
    }
  },
});

export const {
  startFetching,
  stopFetching,
  streamersLoaded,
  feedLoaded,
  forYouFeedLoaded,
  currentStreamerLoaded
} = feed.actions;

export default feed.reducer;

export const loadFeed = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = { data: feedData };
    dispatch(feedLoaded(response.data));
  } catch (error) {
    console.log(error);
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
    console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};

export const loadForYouFeed = (user:any): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    if (user.apps.twitch) {
      const response = await axios.get('https://discoveryapi.gaimz.com/discover/foryou');
      dispatch(forYouFeedLoaded(response.data));
    }
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};

export const getCurrentStreamer = (currentStreamer:any): AppThunk => async (dispatch) => {
  try {
    dispatch(startFetching());
    dispatch(currentStreamerLoaded(currentStreamer));
  } catch (error) {
    // log an error here
    // console.log(error);
  } finally {
    dispatch(stopFetching());
  }
};
