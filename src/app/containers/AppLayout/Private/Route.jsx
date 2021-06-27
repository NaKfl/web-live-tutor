import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { useAuthorization } from 'hooks/useAuthorization';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import useHooks from '../hooks';

const PrivateRoute = ({
  component,
  layout: Layout,
  requiredRoles,
  ...rest
}) => {
  const { selectors } = useHooks();
  const { isAuthenticated } = selectors;
  const user = useSelector(selectUserInfoAuthenticate);
  const canAccess = useAuthorization(user?.currentRole, requiredRoles);
  const renderFn = Component => props => {
    if (canAccess && !!Component && isAuthenticated) {
      return (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      );
    } else {
      if (!isAuthenticated)
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      else
        return (
          <Redirect
            to={{
              pathname: '/permission-denied',
            }}
          />
        );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default PrivateRoute;
