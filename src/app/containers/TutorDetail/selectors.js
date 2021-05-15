import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectTutorDetailState = state => state.tutorDetail;

export const selectTutorDetailData = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getTutorDetail.data', tutorDetail),
);

export const selectScheduleTutorId = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorById', tutorDetail),
);

export const selectScheduleTutorByDate = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorByDate', tutorDetail),
);

export const selectDetailScheduleTutor = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getDetailSchedule', tutorDetail),
);

export const selectbookTimeSchedule = createSelector(
  selectTutorDetailState,
  tutorDetail => get('bookTimeSchedule', tutorDetail),
);
