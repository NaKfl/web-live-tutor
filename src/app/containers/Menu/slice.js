import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

export const initialState = {
  activatedMenu: {},
  isSideNavOpen: false,
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setActivatedMenu(state, action) {
      return flow(set('activatedMenu', action.payload))(state);
    },

    setSideNavOpen(state, action) {
      return flow(set('isSideNavOpen', action.payload))(state);
    },

    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = menusSlice;
