import Chat from 'app/containers/Chat';
import React, { memo } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { StyledContent, StyledLayout } from '../styles';
import querystring from 'querystring';
import isEmpty from 'lodash/fp/isEmpty';
import { MoreMenus } from 'app/containers/MoreMenus/Loadable';

export const PrivateLayout = props => {
  const query = querystring.parse(props?.location?.search);
  const isShowMoreMenus = !isEmpty(query) && query['?more-menus'];

  return (
    <StyledLayout>
      <Header {...props} />
      <Chat />
      {isShowMoreMenus ? (
        <MoreMenus />
      ) : (
        <StyledContent>
          <div className="content-wrapper">{props.children}</div>
        </StyledContent>
      )}
      <Footer />
    </StyledLayout>
  );
};

export default memo(PrivateLayout);
