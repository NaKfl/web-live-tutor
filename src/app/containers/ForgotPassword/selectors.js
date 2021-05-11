import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const forgotPassword = state => state.forgotPassword;

export const makeSelectStep = createSelector(forgotPassword, step =>
  get('step', step),
);
