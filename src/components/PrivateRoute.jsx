import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, null)(PrivateRoute);
