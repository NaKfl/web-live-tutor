import { MessageOutlined } from '@ant-design/icons';
import { Button as AntdButton } from 'antd';
import React, { memo } from 'react';
import { sliceKey, reducer } from './slice';
import { useInjectReducer } from 'utils/reduxInjectors';
import ChatList from './ChatList';
import useHooks from './hooks';
import { StyledBadge, StyledWrapper } from './styles';
import { loginRoutes } from 'app/containers/AppLayout/routes';
import { useLocation } from 'react-router-dom';

export const Chat = () => {
  const { pathname } = useLocation();
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { handleShowHidePopup } = handlers;
  const { isShow, unreadCount } = selectors;
  const loginPaths = Object.values(loginRoutes).map(item => item.path);

  return (
    <>
      {!loginPaths.includes(pathname) && (
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
      )}
    </>
  );
};

export default memo(Chat);
