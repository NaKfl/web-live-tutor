import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectWalletState = state => state.wallet;

export const selectGetHistoryStatus = createSelector(
  selectWalletState,
  wallet => get('getHistory.status', wallet),
);

export const selectGetHistoryData = createSelector(selectWalletState, wallet =>
  get('getHistory.data', wallet),
);
