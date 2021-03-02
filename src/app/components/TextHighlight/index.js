import React from 'react';
import { StyledText, StyledTextHighlight } from './styles';

const TextHighlight = ({ content, ...rest }) => {
  return (
    <StyledTextHighlight>
      <StyledText level={5} {...rest}>
        {content}
      </StyledText>
    </StyledTextHighlight>
  );
};

export default TextHighlight;
