import { MessageOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import React, { memo } from 'react';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import ChatList from './ChatList';
import useHooks from './hooks';
import { StyledBadge, StyledWrapper } from './styles';

export const Chat = () => {
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { handleShowHidePopup } = handlers;
  const { isShow, unreadCount } = selectors;

  return (
    <StyledWrapper>
      {isShow && <ChatList handleShowHidePopup={handleShowHidePopup} />}
      <StyledBadge count={unreadCount} overflowCount={10}>
        <AntdButton
          className="message-button"
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageOutlined className="message-icon" />}
          onClick={handleShowHidePopup}
        ></AntdButton>
      </StyledBadge>
    </StyledWrapper>
  );
};

export default memo(Chat);
