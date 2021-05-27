import useActions from 'hooks/useActions';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import {
  selectBookTimeScheduleStatus,
  selectModalVisible,
  selectModalIdsSelected,
} from '../selectors';
import { actions } from '../slice';

export const useHooks = () => {
  const isModalVisible = useSelector(selectModalVisible);
  const statusBooking = useSelector(selectBookTimeScheduleStatus);
  const idsSelected = useSelector(selectModalIdsSelected);

  const {
    hideModalBooking,
    getPriceOneOfSession,
    bookTimeSchedule,
  } = useActions(
    {
      hideModalBooking: actions.hideModalBooking,
      getPriceOneOfSession: actions.getPriceOneOfSession,
      bookTimeSchedule: actions.bookTimeSchedule,
    },
    [actions, actions],
  );

  useEffect(() => {
    if (isModalVisible) getPriceOneOfSession();
  }, [isModalVisible]);

  const getConditionRender = () => {
    if (statusBooking === ACTION_STATUS.SUCCESS) {
      return CONDITION_RENDER.SUCCESS;
    } else if (statusBooking === ACTION_STATUS.FAILED) {
      return CONDITION_RENDER.FAILED;
    } else {
      return CONDITION_RENDER.BOOKING;
    }
  };

  const onHideModalBooking = useCallback(() => {
    return hideModalBooking();
  }, [hideModalBooking]);

  const onConfirmBooking = useCallback(() => {
    bookTimeSchedule({ scheduleDetailIds: idsSelected });
  }, [idsSelected, bookTimeSchedule]);

  return {
    selectors: {
      isModalVisible,
      getConditionRender: getConditionRender(),
    },
    handlers: {
      onHideModalBooking,
      onConfirmBooking,
    },
  };
};

export const CONDITION_RENDER = {
  BOOKING: 'booking',
  SUCCESS: 'success',
  FAILED: 'failed',
};
