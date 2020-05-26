import { ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from 'src/app/rootReducer';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
