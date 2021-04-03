import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  coursesList: {
    status: '',
    error: null,
    data: [],
  },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCoursesList(state) {
      return flow(
        set('coursesList.error', null),
        set('coursesList.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getCoursesListSuccess(state, action) {
      return flow(
        set('coursesList.data', action.payload),
        set('coursesList.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getCoursesListFailed(state, action) {
      return flow(
        set('coursesList.error', action.payload),
        set('coursesList.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = coursesSlice;
