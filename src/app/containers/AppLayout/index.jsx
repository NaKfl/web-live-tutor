import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { vnp_Url } from 'configs';
import {
  publicRoutes,
  privateRoutes,
  meetingRoutes,
  loginRoutes,
} from './routes';
import PublicRoute from './Public/Route';
import PrivateRoute from './Private/Route';
import MeetingRoute from './MeetingRoute/Route';
import PublicLayout from './Public/Layout';
import LoginLayout from './Login/Layout';
import PrivateLayout from './Private/Layout';
import MeetingLayout from './MeetingRoute/Layout';
import {
  useAuthenticatedRedirect,
  useRefreshToken,
  useListenSocket,
  useNotify,
  useLoginLogoutSocket,
} from './hooks';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import saga from 'app/containers/Login/saga';
import sagaDeposit from 'app/containers/ModalPayment/saga';
import {
  reducer as depositReducer,
  sliceKey as depositSliceKey,
} from 'app/containers/ModalPayment/slice';
import { sliceKey } from 'app/containers/Login/slice';
import ScrollToTop from 'app/components/ScrollToTop';
import Popup from 'app/containers/Popup';
import { Worker } from '@react-pdf-viewer/core';

export const AppLayout = () => {
  useInjectSaga({ key: sliceKey, saga });
  useRefreshToken();
  useLoginLogoutSocket();
  useAuthenticatedRedirect();
  useListenSocket();
  useNotify();
  useInjectReducer({ key: depositSliceKey, reducer: depositReducer });
  useInjectSaga({ key: depositSliceKey, saga: sagaDeposit });

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <ScrollToTop></ScrollToTop>
        <Popup />
        <Switch>
          {loginRoutes.map(route => (
            <PublicRoute
              exact
              key={route.key}
              path={route.path}
              component={route.component}
              layout={LoginLayout}
            />
          ))}
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
          <Route
            path="/checkout-vnpay"
            component={props => {
              const query = props?.location?.search;
              window.location = `${vnp_Url}${query}`;
              return null;
            }}
          />
          <Redirect to="/not-found" />
        </Switch>
      </Worker>
    </>
  );
};

export default memo(AppLayout);
