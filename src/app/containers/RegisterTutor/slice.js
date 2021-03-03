import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
export const initialState = {
  status: '',
  error: null,
};

const registerTutorSlice = createSlice({
  name: 'registerTutor',
  initialState,
  reducers: {
    registerTutor(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    registerTutorSuccess(state) {
      return set('status', ACTION_STATUS.SUCCESS)(state);
    },

    registerTutorFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },

    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = registerTutorSlice;
