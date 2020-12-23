import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectHomeState = state => state.home;
export const makeSelectListTutor = createSelector(selectHomeState, home =>
  get('listTutor', home),
);
export const makeSelectStatus = createSelector(selectHomeState, home =>
  get('status', home),
);
