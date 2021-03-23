import { Tabs } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks';
import { StyledChatList, StyledNavItem } from './styles';
import Avatar from 'app/components/Avatar';
const { TabPane } = Tabs;

export const ChatList = () => {
  const { handlers, selectors } = useHooks();
  const {} = handlers;
  const { recentList } = selectors;
  const { t } = useTranslation();

  return (
    <StyledChatList>
      <Tabs tabPosition="right" tabBarGutter={0}>
        {recentList.map(item => {
          const { partner } = item;
          return (
            <TabPane
              tab={
                <StyledNavItem>
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
              }
              key={item?.id}
            >
              {item?.content}
            </TabPane>
          );
        })}
      </Tabs>
    </StyledChatList>
  );
};

export default memo(ChatList);
