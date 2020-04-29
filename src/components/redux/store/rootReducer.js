import { combineReducers } from 'redux';

import { alert } from '../modules/alert';
import { authentication } from '../modules/authentication';

const rootReducer = combineReducers({
  alert,
  authentication,
});

export default rootReducer;
