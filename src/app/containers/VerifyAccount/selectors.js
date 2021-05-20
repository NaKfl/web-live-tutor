import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectVerifyAccountState = state => state.verifyAccount;

export const selectConfirmStatus = createSelector(
  selectVerifyAccountState,
  verifyAccount => get('confirm.status', verifyAccount),
);
