import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authenticationReducer } from 'app/containers/Login/slice';
import { reducer as homeReducer } from 'app/containers/Home/slice';

export const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    authentication: authenticationReducer,
    home: homeReducer,
    ...injectedReducers,
  });
};
