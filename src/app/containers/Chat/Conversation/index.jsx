import React, { memo } from 'react';
import MessageList from 'app/components/MessageList';
import ChatInput from 'app/components/ChatInput';

import { StyledConversation } from './styles';
import { useHooks } from './hooks';

export const Conversation = props => {
  const { height, isHideInput, handleDeleteNewConversation, ...rest } = props;
  const { states, selectors, handlers } = useHooks(props);
  const { messages } = states;
  const { inputRef, listRef } = selectors;
  const { handleOnPressEnter, handleOnFocus } = handlers;

  return (
    <StyledConversation height={height} {...rest}>
      <MessageList ref={listRef} className="chat-list" messages={messages} />
      {!isHideInput && (
        <ChatInput
          ref={inputRef}
          className="chat-input"
          onFocus={handleOnFocus}
          onPressEnter={e => {
            handleOnPressEnter(e);
            handleDeleteNewConversation();
          }}
        />
      )}
    </StyledConversation>
  );
};

export default memo(Conversation);
