import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Popup from 'app/containers/Popup';
import useHooks from '../hooks';
import { useAuthorization } from 'hooks/useAuthorization';
import { selectUserInfoAuthenticate } from 'app/containers/Login/selectors';
import { useSelector } from 'react-redux';

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
        <Layout>
          <Component {...props} />
          <Popup />
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
