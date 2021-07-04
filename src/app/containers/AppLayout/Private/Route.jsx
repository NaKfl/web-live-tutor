import { useAuthorization } from 'hooks/useAuthorization';
import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { ROLES } from 'utils/constants';
import { useRemoveParticipantJoin, useGetUserInfo } from '../hooks';

const PrivateRoute = ({
  component,
  layout: Layout,
  requiredRoles,
  ...rest
}) => {
  useRemoveParticipantJoin();
  const { user } = useGetUserInfo();
  const canAccess = useAuthorization(user?.currentRole, requiredRoles);
  const { pathname } = useLocation();

  const renderFn = Component => props => {
    if (canAccess && !!Component && user) {
      return (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      );
    } else {
      if (!user)
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      else if (pathname === '/' && user?.currentRole === ROLES.TUTOR)
        return (
          <Redirect
            to={{
              pathname: '/schedule-tutor',
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
