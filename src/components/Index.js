import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import { loadUser } from './redux/modules/authentication';
import setAuthToken from './utils/setAuthToken';
import StreamerNavBar from './StreamerNavBar/StreamerNavBar';
import Alert from './Alert/Alert';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Register from './Register/Register';
import Feed from './Feed/Feed';

const App = ({ isAuthenticated, loadUserAction }) => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    loadUserAction();
  }, [loadUserAction]);

  return (
    <Router>
      {isAuthenticated === true && <StreamerNavBar />}
      <Alert />
      <main>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/feed" exact component={Feed} />
          <Redirect to="/feed" />
        </Switch>
      </main>
    </Router>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadUserAction: (id) => dispatch(loadUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
