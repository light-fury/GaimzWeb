import { combineReducers } from 'redux';
import alert from 'src/features/alert';
import authentication from 'src/features/authentication';
import feed from 'src/features/feed';
import matches from 'src/features/matches';

const rootReducer = combineReducers({
  alert,
  authentication,
  feed,
  matches,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
