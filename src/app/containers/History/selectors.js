import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectHistoryState = state => state.history;

export const makeSelectLoading = createSelector(selectHistoryState, loading =>
  get('load', loading),
);

export const makeListHistory = createSelector(selectHistoryState, list =>
  get('historyList', list),
);

export const makeSelectIsTutor = createSelector(selectHistoryState, isTutor =>
  get('isTutor', isTutor),
);

export const makeTutorCount = createSelector(selectHistoryState, totalCount =>
  get('totalCount', totalCount),
);
