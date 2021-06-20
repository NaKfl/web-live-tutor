import Chat from 'app/containers/Chat';
import React, { memo } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { StyledContent, StyledLayout } from '../styles';

export const PrivateLayout = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <Chat />
      <StyledContent>
        <div className="content-wrapper">{children}</div>
      </StyledContent>
      <Footer />
    </StyledLayout>
  );
};

export default memo(PrivateLayout);
