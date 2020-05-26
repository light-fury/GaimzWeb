/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './helpers';

export interface AlertStatus {
  message: string;
  alertType: string;
  id: string;
}

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

// const SET_ALERT = 'SET_ALERT';
// const setAlert = (payload) => ({
//   type: SET_ALERT,
//   payload
// });

// const REMOVE_ALERT = 'REMOVE_ALERT';
// const removeAlert = (id) => ({
//   type: REMOVE_ALERT,
//   id
// });

// const alerts = (state = initialState, action) => produce(state, (draft) => {
//     switch (action.type) {
//       case SET_ALERT:
//         draft[action.payload.id] = action.payload;
//         return draft;
//       case REMOVE_ALERT:
//         if (state[action.id]) {
//           delete draft[action.id];
//           return draft;
//         }
//         return state;
//       default:
//         return state;
//     }
//   });

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
