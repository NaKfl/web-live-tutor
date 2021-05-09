import React, { memo } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { publicRoutes, privateRoutes, meetingRoutes } from './routes';
import PublicRoute from './Public/Route';
import PrivateRoute from './Private/Route';
import MeetingRoute from './MeetingRoute/Route';
import PublicLayout from './Public/Layout';
import PrivateLayout from './Private/Layout';
import MeetingLayout from './MeetingRoute/Layout';
import { useAuthenticatedRedirect } from './hooks';
import { useInjectSaga } from 'utils/reduxInjectors';
import saga from 'app/containers/Login/saga';
import { sliceKey } from 'app/containers/Login/slice';
import ScrollToTop from 'app/components/ScrollToTop';

export const AppLayout = () => {
  useInjectSaga({ key: sliceKey, saga });
  useAuthenticatedRedirect();

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Switch>
        {publicRoutes.map(route => (
          <PublicRoute
            exact
            key={route.key}
            path={route.path}
            component={route.component}
            layout={PublicLayout}
          />
        ))}
        {privateRoutes.map(route => (
          <PrivateRoute
            exact
            key={route.key}
            path={route.path}
            component={route.component}
            layout={PrivateLayout}
            requiredRoles={route.requiredRoles}
          />
        ))}
        {meetingRoutes.map(route => (
          <MeetingRoute
            exact
            key={route.key}
            path={route.path}
            component={route.component}
            layout={MeetingLayout}
          />
        ))}
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default memo(AppLayout);
