import Button from 'app/components/Button';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectBookingListData } from './selectors';
import { useTranslation } from 'react-i18next';
import { actions } from './slice';

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
  const dataSource = mapBookingListDataSource(data);
  const columnsForStudent = [
    {
      title: t('BookingList.orderNumber'),
      dataIndex: 'stt',
      key: 'no',
      width: '50px',
    },
    {
      title: t('BookingList.studentName'),
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
      width: '160px',
      render: (_, record) => {
        console.log('record', record.tutorMeetingLink);
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
    bordered: true,
    size: 'small',
    pagination: false,
  };
};
