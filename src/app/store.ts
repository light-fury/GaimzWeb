import { configureStore, getDefaultMiddleware, AnyAction } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { pollEpic } from 'src/features/matches';
import rootReducer from './rootReducer';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any, any>();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware]
});

epicMiddleware.run(pollEpic);
export type AppDispatch = typeof store.dispatch;

export default store;
