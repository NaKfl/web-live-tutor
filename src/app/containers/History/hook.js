import { useEffect, useCallback } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import {
  makeListHistory,
  makeSelectLoading,
  makeSelectIsTutor,
  makeTutorCount,
} from './selectors';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { actions } from './slice';
import Button from 'app/components/Button';
import { mapHistoryDataSource } from 'utils/common';
import { useHistory, useLocation } from 'react-router-dom';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useHook = () => {
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
  const user = getUserFromStorage();
  const isTutor = user.currentRole === 'tutor';

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
  const user = getUserFromStorage();
  const isTutor = user.currentRole === 'tutor';

  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const showRatingForm = useCallback(
    tutor => {
      openPopup({
        key: 'showRatingForm',
        type: POPUP_TYPE.RATING_MODAL,
        tutor,
      });
    },
    [openPopup],
  );
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
      render: (text, record, index) => (
        <Button
          size="small"
          onClick={() => {
            const row = historyList[index];
            const tutor = {
              userId: row.tutorId,
            };
            showRatingForm(tutor);
          }}
        >
          Review
        </Button>
      ),
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
