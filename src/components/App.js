import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import './App.css';
import Alert from './Alert/Alert';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Register from './Register/Register';
import Feed from './Feed/Feed';

// Redux
import { Provider } from 'react-redux';
import Store from './redux/store/configureStore';

const store = Store();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
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
    </Provider>
  );
};

export default App;
