import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectDepositAccountState = state => state.depositAccount;

export const selectDepositAccount = createSelector(
  selectDepositAccountState,
  depositState => get('depositAccount', depositState),
);

export const selectDepositAccountStatus = createSelector(
  selectDepositAccountState,
  depositState => get('depositAccount.status', depositState),
);
