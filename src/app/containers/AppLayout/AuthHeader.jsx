import React, { memo } from 'react';
import { StyledHeader } from './styles';

export const AuthHeader = () => {
  return (
    <StyledHeader>
      <div className="logo" />
    </StyledHeader>
  );
};

export default memo(AuthHeader);
