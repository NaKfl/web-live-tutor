import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';

export const initialState = {
  isShow: false,
  recentList: [],
  newConversation: null,
  activatedConversation: null,
  unreadCount: 0,
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChatPopup(state) {
      return set('isShow', !state.isShow)(state);
    },

    openChatPopup(state) {
      return set('isShow', true)(state);
    },

    closeChatPopup(state) {
      return set('isShow', false)(state);
    },

    setRecentList(state, action) {
      if (state.activatedConversation === null)
        state = set('activatedConversation', action.payload[0])(state);
      return set('recentList', action.payload)(state);
    },

    setActivatedConversation(state, action) {
      return set('activatedConversation', action.payload)(state);
    },

    setUnreadCount(state, action) {
      return set('unreadCount', action.payload)(state);
    },

    setNewConversation(state, action) {
      return set('newConversation', action.payload)(state);
    },

    deleteNewConversation(state) {
      return set('newConversation', null)(state);
    },
  },
});

export const { actions, reducer, name, name: sliceKey } = chatSlice;
