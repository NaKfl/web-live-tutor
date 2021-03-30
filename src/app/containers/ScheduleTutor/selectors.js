import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectScheduleState = state => state.scheduleRegister;

export const selectScheduleTutor = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutor', scheduleState),
);
export const selectScheduleTutorByDate = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutorByDate', scheduleState),
);

export const selectRegisterSchedule = createSelector(
  selectScheduleState,
  scheduleState => get('registerSchedule', scheduleState),
);

export const selectUnRegisterSchedule = createSelector(
  selectScheduleState,
  scheduleState => get('unRegisterSchedule', scheduleState),
);
