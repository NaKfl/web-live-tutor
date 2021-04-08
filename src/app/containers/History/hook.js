import { useEffect, useCallback } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import {
  makeListHistory,
  makeSelectLoading,
  makeSelectIsTutor,
  makeTutorCount,
} from './selectors';
import { actions } from './slice';
import Button from 'app/components/Button';
import { mapHistoryDataSource } from 'utils/common';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useHook = () => {
  console.log('render');
  const isTutor = useSelector(makeSelectIsTutor);
  const totalCount = useSelector(makeTutorCount);
  const query = useQuery();
  const history = useHistory();
  const { fetchHistory, changeTargetIsTutor } = useActions(
    {
      fetchHistory: actions.fetchHistory,
      changeTargetIsTutor: actions.changeTargetIsTutor,
    },
    [actions],
  );

  useEffect(() => {
    fetchHistory({ isTutor, page: query.get('page') || 1 });
  }, [fetchHistory, isTutor, query]);

  const changeCategory = useCallback(
    selected => {
      changeTargetIsTutor(selected === 'tutor');
    },
    [changeTargetIsTutor],
  );

  const onChangePage = useCallback(
    value => {
      history.push(`/history?page=${value}`);
    },
    [history],
  );

  return {
    selectors: {
      isTutor,
      totalCount,
    },
    handles: {
      changeCategory,
      onChangePage,
    },
  };
};

export const useForm = () => {
  const historyList = useSelector(makeListHistory);
  const loading = useSelector(makeSelectLoading);
  const isTutor = useSelector(makeSelectIsTutor);

  const datasource = mapHistoryDataSource(historyList, isTutor);
  const columns = [
    {
      key: 'STT',
      dataIndex: 'stt',
      title: 'STT',
      width: '10%',
    },
    {
      key: isTutor ? 'studentName' : 'tutorName',
      dataIndex: isTutor ? 'studentName' : 'tutorName',
      title: isTutor ? 'Student Name' : 'Tutor Name',
    },
    {
      key: 'startTime',
      dataIndex: 'startTime',
      title: 'Start Time',
    },
    {
      key: 'endTime',
      dataIndex: 'endTime',
      title: 'End time',
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'Control',
      width: '10%',
      render: () => <Button size="small">View record</Button>,
    },
  ];

  return {
    dataSource: datasource,
    columns,
    bordered: true,
    loading,
    size: 'small',
    pagination: false,
  };
};
