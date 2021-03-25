import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectChatState = state => state.chat;

export const selectIsShow = createSelector(selectChatState, chat =>
  get('isShow', chat),
);

export const selectRecentList = createSelector(selectChatState, chat =>
  get('recentList', chat),
);

export const selectActivatedConversation = createSelector(
  selectChatState,
  chat => get('activatedConversation', chat),
);

export const selectUnreadCount = createSelector(selectChatState, chat =>
  get('unreadCount', chat),
);

export const selectNewConversation = createSelector(selectChatState, chat =>
  get('newConversation', chat),
);
