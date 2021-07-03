import React from 'react';
import { Route } from 'react-router-dom';
import { useRemoveParticipantJoin } from '../hooks';

const PublicRoute = ({ component, layout: Layout, ...rest }) => {
  useRemoveParticipantJoin();
  const renderFn = Component => props => {
    if (!!Component) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default PublicRoute;
