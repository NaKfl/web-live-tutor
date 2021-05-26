import { useSelector } from 'react-redux';
import { selectGetHistoryStatus, selectGetHistoryData } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';

const useHooks = () => {
  const historyStatus = useSelector(selectGetHistoryStatus);
  const historyData = useSelector(selectGetHistoryData);

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
    selectors: { historyStatus, historyData },
  };
};

export default useHooks;
