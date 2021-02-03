import AppLayout from 'app/containers/AppLayout';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/globalStyles';
import 'styles/core.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - LT" defaultTitle="Live tutor">
        <meta name="description" content="Live tutor" />
      </Helmet>
      <Switch>
        <Route component={AppLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
