import { combineReducers } from 'redux';
import alert from 'src/features/alert';
import authentication from 'src/features/authentication';

const rootReducer = combineReducers({
  alert,
  authentication
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
