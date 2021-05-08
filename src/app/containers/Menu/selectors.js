import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectMenusState = state => state.menus;

export const getActivatedMenu = createSelector(selectMenusState, state =>
  get('activatedMenu', state),
);

export const getIsSideNavOpen = createSelector(selectMenusState, state =>
  get('isSideNavOpen', state),
);
