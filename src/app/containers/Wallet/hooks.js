import { useSelector } from 'react-redux';
import {
  selectGetHistoryStatus,
  selectGetHistoryData,
  getStatisticsStatus,
  getStatisticsData,
} from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import useActions from 'hooks/useActions';

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

export default useHooks;
