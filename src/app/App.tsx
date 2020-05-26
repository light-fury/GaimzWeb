import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { Feed, Login, Register } from 'src/pages';
import setAuthToken from 'src/utils/setAuthToken';
import { StreamerNavbar, Alert } from 'src/components';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from 'src/features/authentication';
import PrivateRoute from './PrivateRoute';
import { RootState } from './rootReducer';

declare const localStorage: any;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated = false } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated === true && <StreamerNavbar />}
      <Alert />
      <main>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <PrivateRoute path="/feed" exact>
            <Feed />
          </PrivateRoute>
          <Redirect to="/feed" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
