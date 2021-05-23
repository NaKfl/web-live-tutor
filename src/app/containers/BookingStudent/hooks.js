import { useEffect, useCallback, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'app/components/Button';
import { Popconfirm } from 'antd';
import { selectBookingList, selectCancelBooking } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { mapBookingListDataSource } from 'utils/common';
import { notifySuccess } from 'utils/notify';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useHooks = () => {
  const history = useHistory();
  const query = useQuery();
  const selectorBookingList = useSelector(selectBookingList);
  const selectorCancelBooking = useSelector(selectCancelBooking);
  const [bookingList, setBookingList] = useState([]);
  const { getBookingList, cancelBookSchedule } = useActions(
    {
      getBookingList: actions.getBookingList,
      cancelBookSchedule: actions.cancelBookSchedule,
    },
    [actions],
  );

  useEffect(() => {
    console.log('query', getBookingList, typeof getBookingList);
    getBookingList({ page: query.get('page') || 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get('page')]);

  useEffect(() => {
    if (
      selectorBookingList &&
      selectorBookingList.status === ACTION_STATUS.SUCCESS
    ) {
      setBookingList(selectorBookingList.data);
    } else {
      setBookingList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorBookingList.status]);

  useEffect(() => {
    if (
      selectorCancelBooking &&
      selectorCancelBooking.status === ACTION_STATUS.SUCCESS
    ) {
      getBookingList({ page: query.get('page') || 1 });
      notifySuccess('Cancel Booking Successfully');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorCancelBooking.status]);

  const onChangePage = useCallback(
    value => {
      history.push(`/booking-student?page=${value}`);
    },
    [history],
  );

  const handleCancelBooking = useCallback(
    scheduleDetailId => {
      cancelBookSchedule({
        scheduleDetailIds: [scheduleDetailId],
      });
    },
    [cancelBookSchedule],
  );

  return {
    selectors: { bookingList },
    handlers: { onChangePage, handleCancelBooking },
  };
};

export const useForm = (data, handleCancelBooking) => {
  const dataSource = mapBookingListDataSource(data);
  const columnsForStudent = [
    {
      key: 'STT',
      dataIndex: 'stt',
      title: 'STT',
      width: '10%',
    },
    {
      key: 'tutorName',
      dataIndex: 'name',
      title: 'Tutor Name',
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Date',
    },
    {
      key: 'startPeriod',
      dataIndex: 'startPeriod',
      title: 'Start Period',
    },
    {
      key: 'endPeriod',
      dataIndex: 'endPeriod',
      title: 'End Period',
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'Control',
      width: '10%',
      render: (text, record, index) => {
        return (
          <div>
            <Popconfirm
              key={record.scheduleDetailId}
              title="Sure to delete booking?"
              onConfirm={() => handleCancelBooking(record.scheduleDetailId)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return {
    dataSource,
    columns: columnsForStudent,
    bordered: true,
    size: 'small',
    pagination: false,
  };
};
