import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDetailCourseState = state => state.detailCourse;

export const selectDetailCourse = createSelector(
  selectDetailCourseState,
  detailCourse => get('detailCourse', detailCourse),
);
