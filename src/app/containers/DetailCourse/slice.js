import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  detailCourse: {
    status: '',
    error: null,
    data: [],
  },
  tutorAddCourse: {
    status: '',
    error: null,
  },
  tutorRemoveCourse: {
    status: '',
    error: null,
  },
};

const detailCourseSlice = createSlice({
  name: 'detailCourse',
  initialState,
  reducers: {
    getDetailCourse(state) {
      return flow(
        set('detailCourse.error', null),
        set('detailCourse.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getDetailCourseSuccess(state, action) {
      return flow(
        set('detailCourse.data', action.payload),
        set('detailCourse.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getDetailCourseFailed(state, action) {
      return flow(
        set('detailCourse.error', action.payload),
        set('detailCourse.status', ACTION_STATUS.FAILED),
      )(state);
    },

    tutorAddCourse(state) {
      return flow(
        set('tutorAddCourse.error', null),
        set('tutorAddCourse.status', ACTION_STATUS.PENDING),
      )(state);
    },

    tutorAddCourseSuccess(state, action) {
      return flow(
        set('tutorAddCourse.data', action.payload),
        set('tutorAddCourse.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    tutorAddCourseFailed(state, action) {
      return flow(
        set('tutorAddCourse.error', action.payload),
        set('tutorAddCourse.status', ACTION_STATUS.FAILED),
      )(state);
    },

    tutorRemoveCourse(state) {
      return flow(
        set('tutorRemoveCourse.error', null),
        set('tutorRemoveCourse.status', ACTION_STATUS.PENDING),
      )(state);
    },

    tutorRemoveCourseSuccess(state, action) {
      return flow(
        set('tutorRemoveCourse.data', action.payload),
        set('tutorRemoveCourse.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    tutorRemoveCourseFailed(state, action) {
      return flow(
        set('tutorRemoveCourse.error', action.payload),
        set('tutorRemoveCourse.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = detailCourseSlice;
