import React, { forwardRef } from 'react';
import { StyledChatInput, StyledSendIcon } from './styles';

const ChatInput = forwardRef(({ handleOnFocus, ...rest }, ref) => {
  return (
    <StyledChatInput
      ref={ref}
      suffix={<StyledSendIcon />}
      placeholder="Aa"
      onFocus={handleOnFocus}
      {...rest}
    />
  );
});

export default ChatInput;
