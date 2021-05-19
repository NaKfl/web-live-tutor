import React, { memo } from 'react';
import { StyledLayout, StyledContent } from '../styles';
import LoginHeader from '../LoginHeader';
import Footer from '../Footer';
import Chat from 'app/containers/Chat';

export const LoginLayout = ({ children }) => (
  <StyledLayout>
    <LoginHeader />
    <Chat />
    <StyledContent>
      <div className="content-wrapper">{children}</div>
    </StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(LoginLayout);
