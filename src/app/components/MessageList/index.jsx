import React, { memo, forwardRef } from 'react';
import MessageBubble from 'app/components/MessageBubble';
import { StyledMessageList } from './styles';
import { Empty } from 'antd';

export const MessageList = forwardRef((props, ref) => {
  const { messages, ...rest } = props;
  return (
    <StyledMessageList ref={ref} {...rest}>
      {(messages.length > 0 &&
        messages.map(({ content, ...properties }, index) => (
          <MessageBubble key={index} {...properties}>
            {content}
          </MessageBubble>
        ))) || <Empty description={false} />}
    </StyledMessageList>
  );
});
export default memo(MessageList);
