import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectTutorDetailState = state => state.tutorDetail;

export const selectTutorDetailData = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getTutorDetail.data', tutorDetail),
);

export const selectTutorDetailStatus = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getTutorDetail.status', tutorDetail),
);

export const selectScheduleTutorId = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorById', tutorDetail),
);

export const selectScheduleTutorIdStatus = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorById.status', tutorDetail),
);

export const selectScheduleTutorByDate = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorByDate', tutorDetail),
);

export const selectScheduleTutorByDateStatus = createSelector(
  selectTutorDetailState,
  tutorDetail => get('scheduleTutorByDate.status', tutorDetail),
);

export const selectDetailScheduleTutor = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getDetailSchedule', tutorDetail),
);

export const selectDetailScheduleTutorStatus = createSelector(
  selectTutorDetailState,
  tutorDetail => get('getDetailSchedule.status', tutorDetail),
);

export const selectbookTimeSchedule = createSelector(
  selectTutorDetailState,
  tutorDetail => get('bookTimeSchedule', tutorDetail),
);

export const selectModalVisible = createSelector(
  selectTutorDetailState,
  isModalVisible => get('modalControl.isModalVisible', isModalVisible),
);

export const selectBookTimeScheduleStatus = createSelector(
  selectTutorDetailState,
  status => get('bookTimeSchedule.status', status),
);

export const selectScheduleTutorByDateData = createSelector(
  selectTutorDetailState,
  scheduleData => get('scheduleTutorByDate.data', scheduleData),
);

export const selectModalIdsSelected = createSelector(
  selectTutorDetailState,
  idsSelected => get('modalControl.idsSelected', idsSelected),
);

export const selectPriceOneOfPrice = createSelector(
  selectTutorDetailState,
  price => get('modalControl.price', price),
);
