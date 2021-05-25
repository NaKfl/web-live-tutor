import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const forgotPassword = state => state.forgotPassword;

export const makeSelectStep = createSelector(forgotPassword, step =>
  get('step', step),
);

export const makeSelectStatus = createSelector(forgotPassword, status =>
  get('status', status),
);

export const makeChangePasswordSuccess = createSelector(
  forgotPassword,
  changePasswordSuccess => get('isChangeSuccess', changePasswordSuccess),
);

export const makeSelectError = createSelector(forgotPassword, error =>
  get('error', error),
);
