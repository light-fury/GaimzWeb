import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';

import './App.css';
import { Provider } from 'react-redux';
import Alert from './Alert/Alert';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Register from './Register/Register';
import Feed from './Feed/Feed';

// Redux
import Store from './redux/store/configureStore';
import { loadUser as loadUserAction } from './redux/modules/authentication';
import setAuthToken from './utils/setAuthToken';

const store = Store();

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUserAction());
  }, [localStorage.token]);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <main>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/feed" exact component={Feed} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
