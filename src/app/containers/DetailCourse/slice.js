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
  },
});

export const { actions, reducer, name: sliceKey } = detailCourseSlice;
