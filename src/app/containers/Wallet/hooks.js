import { useSelector } from 'react-redux';
import { selectGetHistoryStatus, selectGetHistoryData } from './selectors';
import { useCallback, useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { getIncomeOutCome } from './helper';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';

const useHooks = () => {
  const historyStatus = useSelector(selectGetHistoryStatus);
  const historyData = useSelector(selectGetHistoryData);

  const { total, income, outcome, statistics } = getIncomeOutCome(
    historyData.rows,
  );

  const { getHistory } = useActions(
    {
      getHistory: actions.getHistory,
    },
    [actions, actions],
  );

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return {
    handlers: {},
    selectors: {
      historyStatus,
      historyData,
      total,
      income,
      outcome,
      statistics,
    },
  };
};

export const useDeposit = () => {
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const showPaymentModal = useCallback(
    user => {
      openPopup({
        key: 'showPaymentModal',
        type: POPUP_TYPE.PAYMENT_MODAL,
        user,
      });
    },
    [openPopup],
  );

  return { showPaymentModal };
};

export default useHooks;
