import React, { memo } from 'react';
import { StyledLayout, StyledMeeting } from '../styles';

export const PublicLayout = ({ children }) => (
  <StyledLayout>
    <StyledMeeting>{children}</StyledMeeting>
  </StyledLayout>
);

export default memo(PublicLayout);
