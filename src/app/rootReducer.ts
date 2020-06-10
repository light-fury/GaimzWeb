import { combineReducers } from 'redux';
import alert from 'src/features/alert';
import authentication from 'src/features/authentication';
import feed from 'src/features/feed';
import matches from 'src/features/matches';
import oauth from 'src/features/oauth';

const rootReducer = combineReducers({
  alert,
  authentication,
  feed,
  matches,
  oauth
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
