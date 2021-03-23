import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import { StyledChatList, StyledNav, StyledNavItem } from './styles';
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
        height={400}
      />
      <StyledNav>
        {recentList.map(item => {
          const { partner } = item;
          return (
            <StyledNavItem
              active={item.id === activatedConversation?.id}
              onClick={() => handleChangeConversation(item)}
            >
              <Avatar
                size="large"
                className="partner-avatar"
                src={partner?.avatar}
              />
              <div className="partner-info">
                <span className="partner-name">{partner?.name}</span>
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
