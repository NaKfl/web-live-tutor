import React from 'react';
import { StyledTitle } from './styles';

const Title = ({ children, level = 2, ...rest }) => {
  return (
    <StyledTitle level={level} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
