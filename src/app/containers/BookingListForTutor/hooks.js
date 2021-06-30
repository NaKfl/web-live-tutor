import Button from 'app/components/Button';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectBookingListData, selectBookingListStatus } from './selectors';
import { useTranslation } from 'react-i18next';
import { actions } from './slice';
import { Tag } from 'antd';
import { ACTION_STATUS } from 'utils/constants';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const mapBookingListDataSource = data => {
  if (data?.length > 0)
    return data.map((item, index) => {
      const { id, startPeriod, endPeriod, scheduleInfo, bookingInfo } = item;
      const { date } = scheduleInfo;
      const { userInfo, tutorMeetingLink } = bookingInfo[0];
      const { name } = userInfo;
      return {
        id,
        name,
        date,
        startPeriod,
        endPeriod,
        tutorMeetingLink,
        stt: index + 1,
      };
    });
};

export const useHooks = () => {
  const history = useHistory();
  const query = useQuery();
  const bookingList = useSelector(selectBookingListData);
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
  }, [query.get('page')]);

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
        return (
          <Button
            type="accent"
            onClick={() => history.push(record?.tutorMeetingLink)}
          >
            {t('BookingList.goToLink')}
          </Button>
        );
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
