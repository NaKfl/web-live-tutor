import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  listTutor: [],
  count: null,
  error: null,
  status: '',
  listFavorite: [],
  currentPage: 1,
  topTutor: {
    data: null,
    error: null,
    status: '',
  },
  rating: {
    data: null,
    error: null,
    status: '',
  },
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getTopTutor(state) {
      return flow(
        set('topTutor.error', null),
        set('topTutor.status', ACTION_STATUS.PENDING),
      )(state);
    },

    getTopTutorSuccess(state, action) {
      return flow(
        set('topTutor.error', null),
        set('topTutor.status', ACTION_STATUS.SUCCESS),
        set('topTutor.data', action.payload),
      )(state);
    },

    getTopTutorFailure(state, action) {
      return flow(
        set('topTutor.error', action.payload),
        set('topTutor.status', ACTION_STATUS.FAILED),
      )(state);
    },

    reviewTutor(state) {
      return flow(
        set('rating.error', null),
        set('rating.status', ACTION_STATUS.PENDING),
      )(state);
    },

    reviewTutorSuccess(state, action) {
      return flow(
        set('rating.error', null),
        set('rating.status', ACTION_STATUS.SUCCESS),
        set('rating.data', action.payload),
      )(state);
    },

    reviewTutorFailure(state, action) {
      return flow(
        set('rating.error', action.payload),
        set('rating.status', ACTION_STATUS.FAILED),
      )(state);
    },

    fetchRequest(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
        set('currentPage', 1),
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
      const { rows, count } = action.payload;
      return flow(set('listTutor', rows), set('count', count))(state);
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

    pushFavoriteTutorToList(state, action) {
      return flow(set('listFavorite', [...state.listFavorite, action.payload]))(
        state,
      );
    },
    removeFavoriteTutorFromList(state, action) {
      return flow(
        set(
          'listFavorite',
          [...state.listFavorite].filter(
            value => value.secondId !== action.payload,
          ),
        ),
      )(state);
    },
  },
});

export const { actions, reducer, name, name: sliceKey } = homeSlice;
