import { useSelector } from 'react-redux';
import {
  selectGetHistoryStatus,
  selectGetHistoryData,
  getStatisticsStatus,
  getStatisticsData,
} from './selectors';
import { useCallback, useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';

const useHooks = props => {
  const historyStatus = useSelector(selectGetHistoryStatus);
  const historyData = useSelector(selectGetHistoryData);
  const statisticsStatus = useSelector(getStatisticsStatus);
  const statisticsData = useSelector(getStatisticsData);

  const { getHistory, getStatistics } = useActions(
    {
      getHistory: actions.getHistory,
      getStatistics: actions.getStatistics,
    },
    [actions, actions],
  );

  useEffect(() => {
    getHistory();
    getStatistics();
  }, [getHistory, getStatistics]);

  return {
    handlers: {},
    selectors: {
      isLoading: historyStatus && statisticsStatus,
      historyData,
      statisticsData,
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

  const showTransactionModal = useCallback(
    transactions => {
      openPopup({
        key: 'showTransactionModal',
        type: POPUP_TYPE.TRANSACTION_MODAL,
        transactions,
      });
    },
    [openPopup],
  );

  return { showPaymentModal, showTransactionModal };
};

export default useHooks;
