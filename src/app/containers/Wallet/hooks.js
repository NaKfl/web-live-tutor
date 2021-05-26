import { useSelector } from 'react-redux';
import { selectGetHistoryStatus, selectGetHistoryData } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';

const getIncomeOutCome = history => {
  if (!history || !history.length) {
    return { total: 0, income: 0, outcome: 0 };
  }
  return history.reduce(
    (acc, curr) => {
      if (curr.price < 0)
        return {
          ...acc,
          total: acc.total + +curr.price,
          outcome: acc.outcome + +curr.price,
        };
      if (curr.price > 0)
        return {
          ...acc,
          total: acc.total + +curr.price,
          income: acc.income + +curr.price,
        };
      return acc;
    },
    { total: 0, income: 0, outcome: 0 },
  );
};

const useHooks = () => {
  const historyStatus = useSelector(selectGetHistoryStatus);
  const historyData = useSelector(selectGetHistoryData);

  const { total, income, outcome } = getIncomeOutCome(historyData.rows);

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
    selectors: { historyStatus, historyData, total, income, outcome },
  };
};

export default useHooks;
