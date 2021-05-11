import AppLayout from 'app/containers/AppLayout';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/globalStyles';
import 'styles/core.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Live Tutor" defaultTitle="Live Tutor">
        <meta name="description" content="Live Tutor" />
      </Helmet>
      <Switch>
        <Route component={AppLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
