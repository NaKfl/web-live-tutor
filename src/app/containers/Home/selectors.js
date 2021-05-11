import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectHomeState = state => state.home;
export const makeSelectListTutor = createSelector(selectHomeState, home =>
  get('listTutor', home),
);
export const makeSelectStatus = createSelector(selectHomeState, home =>
  get('status', home),
);

export const makeSelectListFavorite = createSelector(
  selectHomeState,
  listFavorite => get('listFavorite', listFavorite),
);

export const makeSelectCount = createSelector(selectHomeState, count =>
  get('count', count),
);

export const makeCurrentPage = createSelector(selectHomeState, currentPage =>
  get('currentPage', currentPage),
);

export const selectTopTutorData = createSelector(selectHomeState, currentPage =>
  get('topTutor.data', currentPage),
);
