import { v4 as uuidv4 } from 'uuid';

const initialState = [];

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


const alert = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((a) => a.id !== action.id);
    default:
      return state;
  }
};


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
