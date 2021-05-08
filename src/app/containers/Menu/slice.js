import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

export const initialState = {
  activeMenu: '',
  activeItem: '',
  isSideNavOpen: false,
  childrenMenusOpen: [],
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    fetchActiveMenu(state, action) {
      return flow(set('activeMenu', action.payload))(state);
    },
    fetchActiveItem(state, action) {
      return flow(set('activeItem', action.payload))(state);
    },
    fetchSideNavOpen(state, action) {
      return flow(set('isSideNavOpen', action.payload))(state);
    },
    fetchChildrenMenusOpen(state, action) {
      return flow(set('childrenMenusOpen', action.payload))(state);
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = menusSlice;
