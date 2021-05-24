import Button from 'app/components/Button';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { mapHistoryDataSource } from 'utils/common';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import {
  makeListHistory,
  makeSelectLoading,
  makeTutorCount,
} from './selectors';
import { actions } from './slice';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTutor, query.get('page')]);

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
  const columnsForStudent = [
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
      key: 'during',
      dataIndex: 'during',
      title: 'During time',
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'Control',
      width: '10%',
      render: (text, record, index) => {
        const row = historyList[index];
        if (row.isReviewed) {
          return <span>Reviewed</span>;
        } else {
          return (
            <Button
              size="small"
              onClick={() => {
                const tutor = {
                  userId: row.tutorId,
                  sessionId: row.id,
                };
                showRatingForm(tutor);
              }}
            >
              Review
            </Button>
          );
        }
      },
    },
  ];

  const columnsForTutor = [
    {
      key: 'STT',
      dataIndex: 'stt',
      title: 'STT',
      width: '10%',
    },
    {
      key: 'studentName',
      dataIndex: 'studentName',
      title: 'Student Name',
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
      key: 'during',
      dataIndex: 'during',
      title: 'During time',
    },
  ];

  return {
    dataSource: datasource,
    columns: isTutor ? columnsForTutor : columnsForStudent,
    bordered: true,
    loading,
    size: 'small',
    pagination: false,
  };
};
