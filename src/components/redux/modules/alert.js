import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

const initialState = {
  alerts: [],
};

const SET_ALERT = 'SET_ALERT';
const setAlert = (payload) => ({
  type: SET_ALERT,
  payload,
});

const REMOVE_ALERT = 'REMOVE_ALERT';
const removeAlert = (id) => ({
  type: REMOVE_ALERT,
  id,
});

const alert = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_ALERT:
      draft.alerts.push(action.payload);
      return draft;
    case REMOVE_ALERT:
      if (state.alerts.some((item) => item.id === action.id)) {
        draft.alerts.splice(draft.alerts.findIndex((item) => item.id === action.id), 1);
        return draft;
      }
      return state;
    default:
      return state;
  }
});

const createAlert = (message, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  const payload = { message, alertType, id };
  dispatch(setAlert(payload));
  setTimeout(() => dispatch(removeAlert(id)), timeout);
};

export {
  alert,
  createAlert,
  removeAlert,
};
