import React, { memo } from 'react';
import { StyledLayout, StyledContent } from '../styles';
import Header from '../Header';
import Footer from '../Footer';
import Chat from 'app/containers/Chat';

export const PrivateLayout = ({ children }) => (
  <StyledLayout>
    <Header />
    <Chat />
    <StyledContent>
      <div className="content-wrapper">{children}</div>
    </StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(PrivateLayout);
