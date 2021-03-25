import React from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component, layout: Layout, ...rest }) => {
  const renderFn = Component => props => {
    if (!!Component) {
      return (
        <Layout style={{ padding: 0 }}>
          <Component {...props} />
        </Layout>
      );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default PublicRoute;
