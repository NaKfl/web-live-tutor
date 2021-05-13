import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  getTutorDetail: {
    data: {},
    status: '',
    error: null,
  },
};

const tutorDetailSlice = createSlice({
  name: 'tutorDetail',
  initialState,
  reducers: {
    getTutorDetail(state) {
      return flow(
        set('getTutorDetail.error', null),
        set('getTutorDetail.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getTutorDetailSuccess(state, action) {
      return flow(
        set('getTutorDetail.data', action.payload),
        set('getTutorDetail.status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getTutorDetailFailed(state, action) {
      return flow(
        set('getTutorDetail.error', action.payload),
        set('getTutorDetail.status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = tutorDetailSlice;
