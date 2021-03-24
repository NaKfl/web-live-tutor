import { MessageOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ChatList from './ChatList';
import useHooks from './hooks';
import { StyledBadge, StyledWrapper } from './styles';

export const Chat = () => {
  const { handlers, selectors } = useHooks();
  const { handleShowHidePopup } = handlers;
  const { togglePopup, unreadCount } = selectors;
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      {togglePopup && <ChatList />}
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
