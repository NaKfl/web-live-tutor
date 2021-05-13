import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectTutorDetailState = state => state.tutorDetail;

export const selectTutorDetailData = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getTutorDetail.data', tutorDetail),
);
