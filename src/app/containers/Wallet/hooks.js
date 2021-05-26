import { useSelector } from 'react-redux';
import { selectGetHistoryStatus, selectGetHistoryData } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';
import { getIncomeOutCome } from './helper';

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

export default useHooks;
