import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

export const ChatList = () => {
  const { handlers, selectors } = useHooks();
  const { handleChangeConversation } = handlers;
  const { recentList, activatedConversation } = selectors;
  const { t } = useTranslation();
  const user = getUserFromStorage();

  return (
    <StyledChatList>
      <Conversation
        className="chat-window"
        fromId={user?.id}
        toId={activatedConversation?.partner?.id}
        activatedConversation={activatedConversation}
        height={400}
      />
      <StyledNav>
        {recentList.map(item => {
          const { partner, isRead, toInfo } = item;
          return (
            <StyledNavItem
              active={partner?.id === activatedConversation?.partner?.id}
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
                <p className="last-content">{item?.content}</p>
              </div>
            </StyledNavItem>
          );
        })}
      </StyledNav>
    </StyledChatList>
  );
};

export default memo(ChatList);
