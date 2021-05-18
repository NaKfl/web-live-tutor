import React from 'react';
import { StyledText, StyledTextHighlight } from './styles';

const TextHighlight = ({ content, color, ...rest }) => {
  return (
    <StyledTextHighlight color={color} {...rest}>
      <StyledText level={5}>{content}</StyledText>
    </StyledTextHighlight>
  );
};

export default TextHighlight;
