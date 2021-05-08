/**
 * Menu selectors
 */

import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectMenusState = state => state.menus;

const getSelectActiveMenu = createSelector(selectMenusState, state =>
  get('activeMenu', state),
);

const getSelectActiveItem = createSelector(selectMenusState, state =>
  get('activeItem', state),
);

const getSelectIsSideNavOpen = createSelector(selectMenusState, state =>
  get('isSideNavOpen', state),
);

const getSelectChildrenMenusOpen = createSelector(selectMenusState, state =>
  get('childrenMenusOpen', state),
);
export {
  getSelectActiveMenu,
  getSelectActiveItem,
  getSelectIsSideNavOpen,
  getSelectChildrenMenusOpen,
};
