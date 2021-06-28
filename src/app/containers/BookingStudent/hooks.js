import { useEffect, useCallback, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'app/components/Button';
import { Popconfirm, Row } from 'antd';
import { selectBookingList, selectCancelBooking } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { mapBookingListDataSource } from 'utils/common';
import { useTranslation } from 'react-i18next';

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
    getBookingList({ page: query.get('page') || 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.get('page'), selectorCancelBooking.status]);

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
  const history = useHistory();
  const { t } = useTranslation();
  const dataSource = mapBookingListDataSource(data);
  const columnsForStudent = [
    {
      title: t('BookingList.orderNumber'),
      dataIndex: 'stt',
      key: 'no',
      width: '50px',
    },
    {
      title: t('BookingList.tutorName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('BookingList.date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('BookingList.startPeriod'),
      dataIndex: 'startPeriod',
      key: 'startPeriod',
    },
    {
      title: t('BookingList.endPeriod'),
      dataIndex: 'endPeriod',
      key: 'endPeriod',
    },
    {
      title: t('BookingList.action'),
      key: 'action',
      width: '255px',
      render: (_, record) => {
        return (
          <Row justify="space-around">
            <Popconfirm
              key={record.scheduleDetailId}
              title="Sure to delete booking?"
              onConfirm={() => handleCancelBooking(record.scheduleDetailId)}
            >
              <Button disabled={!record.canDelete}>
                {t('BookingList.cancel')}
              </Button>
            </Popconfirm>
            <Button
              disabled={!record.canGoToMeeting}
              type="accent"
              onClick={() => history.push(record?.studentMeetingLink)}
            >
              {t('BookingList.goToLink')}
            </Button>
          </Row>
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
