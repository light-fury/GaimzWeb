import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import './App.css';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Register from './Register/Register';
import Feed from './Feed/Feed';

const App = () => {
  return (
    <Router>
      {/* <ul>
        <li><Link to='login'>Login</Link></li>
        <li><Link to='Register'>Register</Link></li>
        <li><Link to='Feed'>Feed</Link></li>
      </ul> */}
      <main>
        <Switch>
          <Route path='/login' exact={true} component={Login} />
          <Route path='/register' exact={true} component={Register} />
          <PrivateRoute path='/feed' exact={true} component={Feed} />
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
