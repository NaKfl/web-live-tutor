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
  selectTotal,
} from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { mapBookingListDataSource } from 'utils/common';
import { useTranslation } from 'react-i18next';
import qs from 'query-string';

export const useHooks = () => {
  const location = useLocation();
  const history = useHistory();
  const selectorBookingList = useSelector(selectBookingList);
  const selectorCancelBooking = useSelector(selectCancelBooking);
  const total = useSelector(selectTotal);
  const [bookingList, setBookingList] = useState([]);
  const { getBookingList, cancelBookSchedule } = useActions(
    {
      getBookingList: actions.getBookingList,
      cancelBookSchedule: actions.cancelBookSchedule,
    },
    [actions],
  );

  useEffect(() => {
    const { page } = qs.parse(location.search);
    getBookingList({ page: page || 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorCancelBooking.status, location.search]);

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
    selectors: { bookingList, total },
    handlers: { onChangePage, handleCancelBooking },
  };
};

export const useForm = (data, handleCancelBooking) => {
  console.log(data);
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
    locale: {
      emptyText: t('Common.empty'),
    },
  };
};
