import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StyledTextTimeSchedule, StyledTotal } from './styles';
import {
  selectModalIdsSelected,
  selectScheduleTutorByDateData,
  selectPriceOneOfPrice,
  selectSelectedKeys,
} from '../selectors';
import { useTranslation } from 'react-i18next';

export const useTables = () => {
  const { t } = useTranslation();
  const scheduleData = useSelector(selectScheduleTutorByDateData);
  const idsSelectedKey = useSelector(selectSelectedKeys);
  const idsSelected = useSelector(selectModalIdsSelected);
  const priceOfOneSession = useSelector(selectPriceOneOfPrice);

  const columns = [
    {
      title: (
        <span style={{ fontWeight: '600' }}>
          {t('BookingList.modalConfirm.timeBooked')}
        </span>
      ),
      dataIndex: 'timeBooked',
      key: 'timeBooked',
      width: '80%',
      render: time => (
        <StyledTextTimeSchedule
          key={time.startTime}
          className="time-select"
          typeText="Purple"
          content={`${time.startTime} - ${time.endTime}`}
        />
      ),
    },
    {
      title: (
        <span style={{ fontWeight: '600' }}>
          {t('BookingList.modalConfirm.price')}
        </span>
      ),
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
  ];

  const dataSource = useMemo(() => {
    if (scheduleData) {
      const mapScheduleDetails = scheduleData
        .filter(sched => {
          return idsSelectedKey.indexOf(sched.id);
        })
        .map(value => value.scheduleDetails)
        .flat();
      const res = mapScheduleDetails
        .filter(item => idsSelected.includes(item.id))
        .map((value, i) => ({
          key: i,
          timeBooked: {
            startTime: value.startPeriod,
            endTime: value.endPeriod,
          },
          price: new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(priceOfOneSession),
        }));
      return res;
    }
    return [];
  }, [idsSelected, idsSelectedKey, priceOfOneSession, scheduleData]);

  const footer = () => {
    return (
      <>
        <StyledTotal>
          <div className="title" style={{ fontWeight: '600' }}>
            {t('BookingList.modalConfirm.total')}
          </div>
          <div className="d-flex price">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(dataSource.length * priceOfOneSession)}
          </div>
        </StyledTotal>
      </>
    );
  };

  return {
    columns,
    dataSource,
    size: 'small',
    pagination: false,
    bordered: true,
    footer,
  };
};

export default useTables;
