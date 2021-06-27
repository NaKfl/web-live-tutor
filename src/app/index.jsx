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
        <meta name="description" content="Live online tutoring platform" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livetutor.live/" />
        <meta
          property="og:image"
          content="https://livetutor.live/logo192.png"
        />
        <meta
          property="og:description"
          content="Live online tutoring platform"
        />
      </Helmet>
      <Switch>
        <Route component={AppLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
