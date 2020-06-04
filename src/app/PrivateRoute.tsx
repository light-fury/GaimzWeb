/* eslint-disable react/jsx-props-no-spreading */
// This is disabled here because this is a helper component
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const { isAuthenticated = false } = useSelector(
    (state: RootState) => state.authentication
  );
  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PrivateRoute;
