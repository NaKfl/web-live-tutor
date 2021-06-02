import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const verifyDepositState = state => state.verifyDeposit;

export const selectVerifyDepositStatus = createSelector(
  verifyDepositState,
  verifyDeposit => get('verifyDeposit.status', verifyDeposit),
);
