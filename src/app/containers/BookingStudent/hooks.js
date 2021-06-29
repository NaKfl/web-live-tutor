import { useEffect, useCallback, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'app/components/Button';
import { Popconfirm, Row, Tag } from 'antd';
import {
  selectBookingList,
  selectCancelBooking,
  selectBookingListStatus,
} from './selectors';
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
  const status = useSelector(selectBookingListStatus);
  const dataSource = mapBookingListDataSource(data);
  const columnsForStudent = [
    {
      title: <p className="title">{t('BookingList.orderNumber')}</p>,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      align: 'center',
      width: '55px',
    },
    {
      title: <p className="title">{t('BookingList.tutorName')}</p>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      ellipsis: true,
      width: '20%',
    },
    {
      title: <p className="title">{t('BookingList.date')}</p>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <p className="title">{t('BookingList.startPeriod')}</p>,
      dataIndex: 'startPeriod',
      key: 'startPeriod',
      render: value => <Tag color="blue">{value}</Tag>,
    },
    {
      title: <p className="title">{t('BookingList.endPeriod')}</p>,
      dataIndex: 'endPeriod',
      key: 'endPeriod',
      render: value => <Tag color="volcano">{value}</Tag>,
    },
    {
      title: <p className="title">{t('BookingList.action')}</p>,
      key: 'action',
      width: '255px',
      render: (_, record) => {
        return (
          <Row justify="space-around">
            <Popconfirm
              key={record.scheduleDetailId}
              title={t('BookingList.cancelQuestion')}
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
    size: 'small',
    pagination: false,
    scroll: { x: 850 },
    bordered: false,
    loading: status === ACTION_STATUS.PENDING,
  };
};
