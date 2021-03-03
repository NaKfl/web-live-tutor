import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectRegisterTutorState = state => state.registerTutor;

const makeSelectRegisterTutorStatus = createSelector(
  selectRegisterTutorState,
  registerTutor => get('status', registerTutor),
);

const makeSelectRegisterTutorError = createSelector(
  selectRegisterTutorState,
  registerTutor => get('error', registerTutor),
);

export { makeSelectRegisterTutorError, makeSelectRegisterTutorStatus };
