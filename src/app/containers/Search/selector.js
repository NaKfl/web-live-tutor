import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectSearchState = state => state.search;

export const makeSelectedshowHideDropDown = createSelector(
  selectSearchState,
  showHideDropDown => get('showHideDropDown', showHideDropDown),
);

export const makeSelectedOption = createSelector(selectSearchState, option =>
  get('option', option),
);

export const makeListTutorFilter = createSelector(
  selectSearchState,
  listTutor => get('listTutor', listTutor),
);

export const makeTotalCount = createSelector(selectSearchState, count =>
  get('count', count),
);

export const makePageCurrent = createSelector(selectSearchState, pageCurrent =>
  get('option.page', pageCurrent),
);
