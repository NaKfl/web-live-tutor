import Button from 'app/components/Button';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  selectBookingListData,
  selectBookingListStatus,
  selectTotal,
} from './selectors';
import { useTranslation } from 'react-i18next';
import { actions } from './slice';
import { Tag } from 'antd';
import { ACTION_STATUS, DATE_TIME_FORMAT } from 'utils/constants';
import qs from 'query-string';
import moment from 'moment';
import { orderBy } from 'lodash';

const mapBookingListDataSource = data => {
  const sortData = orderBy(
    data,
    ['scheduleInfo.date', 'startPeriod'],
    ['desc', 'asc'],
  );
  if (data?.length > 0)
    return sortData.map((item, index) => {
      const { id, startPeriod, endPeriod, scheduleInfo, bookingInfo } = item;
      const { date } = scheduleInfo;
      const { userInfo, tutorMeetingLink } = bookingInfo[0];
      const { name } = userInfo;
      let durationGotoMeeting = moment.duration(
        moment().diff(moment(`${date} ${endPeriod}`, DATE_TIME_FORMAT)),
      );
      let hoursGotoMeeting = durationGotoMeeting.asHours();
      return {
        id,
        name,
        date,
        startPeriod,
        endPeriod,
        tutorMeetingLink,
        canGoToMeeting: hoursGotoMeeting <= 0,
        stt: index + 1,
      };
    });
};

export const useHooks = () => {
  const history = useHistory();
  const location = useLocation();
  const bookingList = useSelector(selectBookingListData);
  const total = useSelector(selectTotal);
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
  }, [getBookingList, location.search]);

  const onChangePage = useCallback(
    value => {
      history.push(`/booking-tutor?page=${value}`);
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

export const useForm = data => {
  const { t } = useTranslation();
  const history = useHistory();
  const status = useSelector(selectBookingListStatus);
  const dataSource = mapBookingListDataSource(data);
  const columnsForStudent = [
    {
      title: <p className="title">{t('BookingList.orderNumber')}</p>,
      dataIndex: 'stt',
      key: 'no',
      fixed: 'left',
      align: 'center',
      width: '55px',
    },
    {
      title: <p className="title">{t('BookingList.studentName')}</p>,
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
      width: '160px',
      align: 'center',
      render: (_, record) => {
        if (record.canGoToMeeting)
          return (
            <Button
              disabled={!record.canGoToMeeting}
              type="accent"
              onClick={() =>
                record?.tutorMeetingLink &&
                history.push(record?.tutorMeetingLink)
              }
            >
              {t('BookingList.goToLink')}
            </Button>
          );
        else return <span>---------</span>;
      },
    },
  ];

  return {
    dataSource,
    columns: columnsForStudent,
    size: 'small',
    pagination: false,
    scroll: { x: 650 },
    bordered: false,
    loading: status === ACTION_STATUS.PENDING,
    locale: {
      emptyText: t('Common.empty'),
    },
  };
};
