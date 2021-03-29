import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectScheduleState = state => state.scheduleRegister;

export const selectScheduleTutor = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutor', scheduleState),
);
