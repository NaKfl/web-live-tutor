import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectChatListState = state => state.chatList;

export const selectChatListInfo = createSelector(
  selectChatListState,
  chatList => get('getRecentList', chatList),
);
