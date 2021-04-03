import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectCoursesState = state => state.courses;

export const selectCoursesList = createSelector(
  selectCoursesState,
  coursesState => get('coursesList', coursesState),
);
