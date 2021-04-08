import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  loading: false,
  status: null,
  error: null,
};

const jitsiMeetPageSlice = createSlice({
  name: 'jitsiMeet',
  initialState: initialState,
  reducers: {
    endCall: state => {
      return flow(
        set('loading', true),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    endCallSuccess: state => {
      return flow(
        set('loading', false),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    endCallFail: (state, action) => {
      return flow(
        set('status', ACTION_STATUS.FAILED),
        set('error', action.payload),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = jitsiMeetPageSlice;
