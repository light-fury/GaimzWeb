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
      {isAuthenticated === true && <StreamerNavBar streamers={streamers} />}
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

const streamers = [
  {
    id: 'e1',
    name: 'BrendenLive',
    icon:
      'https://tinyfac.es/data/avatars/475605E3-69C5-4D2B-8727-61B7BB8C4699-500w.jpeg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e2',
    name: 'DaisyTTV',
    icon: 'https://randomuser.me/api/portraits/women/44.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
  {
    id: 'e3',
    name: 'JamesLion',
    icon:
      'https://pbs.twimg.com/profile_images/1054434556156162054/1H_7AxP0.jpg',
    following: true,
    subscribed: true,
    online: false,
  },
  {
    id: 'e4',
    name: 'BrandanDunn',
    icon:
      'https://pbs.twimg.com/profile_images/953658232517652480/Xp0NB-TL.jpg',
    following: true,
    subscribed: true,
    online: true,
  },
  {
    id: 'e5',
    name: 'SnailSong',
    icon:
      'https://pbs.twimg.com/profile_images/1063204281375834112/6h0HeYG_.jpg',
    following: true,
    subscribed: false,
    online: true,
  },
];
