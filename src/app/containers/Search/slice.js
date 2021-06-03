import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';
const initialState = {
  showHideDropDown: false,
  option: {
    page: 1,
  },
  status: null,
  loading: null,
  listTutor: [],
  count: 0,
  haveNoTutor: false,
  filter: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    showHideDropDown: state => {
      return flow(set('showHideDropDown', !state.showHideDropDown))(state);
    },

    hideDropDown: state => {
      return flow(set('showHideDropDown', false))(state);
    },

    optionFromUrl: (state, action) => {
      return flow(
        set('option', { ...state.option, ...action.payload }),
        set('loading', true),
      )(state);
    },

    searchTutor: state => {
      return flow(set('status', ACTION_STATUS.PENDING))(state);
    },

    searchTutorSuccess: state => {
      return flow(set('status', ACTION_STATUS.SUCCESS))(state);
    },

    searchTutorFail: state => {
      return flow(set('status', ACTION_STATUS.FAILED))(state);
    },

    resetState() {
      return { ...initialState };
    },

    getListTutorSuccess(state, action) {
      const { list, count } = action.payload;
      return flow(
        set('listTutor', list),
        set('count', count),
        set('loading', false),
      )(state);
    },

    getListTutorFailed(state, action) {
      return flow(set('error', action.payload), set('loading', false))(state);
    },

    setHaveNoTutor(state, action) {
      return flow(set('haveNoTutor', action.payload))(state);
    },

    changePage(state, action) {
      return flow(set('option.page', parseInt(action.payload)))(state);
    },
    getFilter(state) {
      return state;
    },
    getFilterSuccess(state, action) {
      return flow(set('filter', [...action.payload]))(state);
    },
    getFilterFailed(state, action) {
      return flow(set('error', action.payload))(state);
    },
    onChangeFilter(state, action) {
      const { category, tag } = action.payload;
      return flow(set(`option.${category}`, tag))(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = searchSlice;
