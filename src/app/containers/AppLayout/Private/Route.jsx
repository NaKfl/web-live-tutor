import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Popup from 'app/containers/Popup';
import useHooks from '../hooks';

const PrivateRoute = ({ component, layout: Layout, ...rest }) => {
  const { selectors } = useHooks();
  const { isAuthenticated } = selectors;
  const renderFn = Component => props => {
    if (!!Component && isAuthenticated) {
      return (
        <Layout>
          <Component {...props} />
          <Popup />
        </Layout>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default PrivateRoute;
