import React, { memo } from 'react';
import { StyledLayout, StyledContent } from '../styles';
import PublicHeader from '../Header';
import Footer from '../Footer';

export const PublicLayout = ({ children }) => (
  <StyledLayout>
    <PublicHeader />
    <StyledContent>
      <div className="content-wrapper">{children}</div>
    </StyledContent>
    <Footer />
  </StyledLayout>
);

export default memo(PublicLayout);
