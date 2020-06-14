/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertStatus } from 'src/models/alert-status';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './helpers';


const initialState: { [alert: string]: AlertStatus } = {};

const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, { payload }: PayloadAction<AlertStatus>) {
      state[payload.id] = payload;
    },
    removeAlert(state, { payload }: PayloadAction<string>) {
      delete state[payload];
    },
  },
});
export const { setAlert, removeAlert } = alert.actions;

export default alert.reducer;

export const createAlert = (
  message: string,
  alertType: string,
  timeout = 5000
): AppThunk => (dispatch) => {
  const id = uuidv4();
  const payload = { message, alertType, id };
  dispatch(setAlert(payload));
  setTimeout(() => dispatch(removeAlert(id)), timeout);
};
