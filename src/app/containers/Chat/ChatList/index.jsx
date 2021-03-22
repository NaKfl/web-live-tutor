import { Tabs } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledChatList } from './styles';
const { TabPane } = Tabs;

export const ChatList = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const {} = handlers;
  const {} = selectors;
  const { t } = useTranslation();

  return (
    <StyledChatList>
      <Tabs tabPosition="right">
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </StyledChatList>
  );
};

export default memo(ChatList);
