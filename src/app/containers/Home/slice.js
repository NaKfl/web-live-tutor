import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  listTutor: [],
  error: null,
  status: '',
  listFavorite: [],
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchRequest(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    fetchRequestSuccess(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    fetchRequestFailure(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
    getList(state, action) {
      return flow(set('listTutor', action.payload))(state);
    },

    manageFavoriteTutor(state, action) {
      return flow(set('error', null))(state);
    },

    fetchFavoriteList(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },
    fetchFavoriteListSuccess(state, action) {
      return flow(
        set('listFavorite', action.payload),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },
    fetchFavoriteListFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name, name: sliceKey } = homeSlice;
