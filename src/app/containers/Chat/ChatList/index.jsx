import React, { memo } from 'react';
import useHooks from './hooks';
import {
  StyledChatList,
  StyledNav,
  StyledNavItem,
  StyledAvatar,
  StyledBadge,
} from './styles';
import Avatar from 'app/components/Avatar';
import Conversation from '../Conversation';
import { DeleteFilled, CloseCircleFilled } from '@ant-design/icons';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const ChatList = ({ handleShowHidePopup, ...rest }) => {
  const { handlers, selectors } = useHooks();
  const { handleChangeConversation, handleDeleteNewConversation } = handlers;
  const { recentList, activatedConversation, newConversation } = selectors;
  const user = getUserFromStorage();

  return (
    <StyledChatList {...rest}>
      <CloseCircleFilled onClick={handleShowHidePopup} className="close-btn" />
      <Conversation
        className="chat-window"
        fromId={user?.id}
        toId={
          newConversation?.partner?.id ?? activatedConversation?.partner?.id
        }
        activatedConversation={activatedConversation}
        handleDeleteNewConversation={handleDeleteNewConversation}
        height={400}
      />
      <StyledNav>
        {newConversation && (
          <StyledNavItem
            isActive={
              newConversation?.partner?.id ===
              activatedConversation?.partner?.id
            }
          >
            <StyledAvatar className="partner-avatar">
              <Avatar size={40} src={newConversation?.partner?.avatar} />
              <StyledBadge
                color={newConversation?.partner?.isOnline && 'green'}
              />
            </StyledAvatar>
            <div className="partner-info">
              <span className="partner-name">
                {newConversation?.partner?.name ?? 'Anonymous'}
              </span>
              <p className="last-content">{'<Draft>'}</p>
            </div>
            <DeleteFilled
              className="delete-btn"
              onClick={() => handleDeleteNewConversation(true)}
            />
          </StyledNavItem>
        )}
        {recentList.length > 0 &&
          recentList.map(item => {
            const { partner, isRead, toInfo } = item;
            return (
              <StyledNavItem
                key={partner?.id}
                isActive={partner?.id === activatedConversation?.partner?.id}
                onClick={() => handleChangeConversation(item)}
                isBold={!isRead && toInfo?.id === user?.id}
              >
                <StyledAvatar className="partner-avatar">
                  <Avatar size={40} src={partner?.avatar} />
                  <StyledBadge color={partner?.isOnline && 'green'} />
                </StyledAvatar>
                <div className="partner-info">
                  <span className="partner-name">
                    {partner?.name ?? 'Anonymous'}
                  </span>
                  <p className="last-content">{item?.content ?? '<<Draft>>'}</p>
                </div>
              </StyledNavItem>
            );
          })}
      </StyledNav>
    </StyledChatList>
  );
};

export default memo(ChatList);
