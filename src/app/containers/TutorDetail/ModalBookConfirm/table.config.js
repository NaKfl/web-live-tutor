import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TextTimeSchedule from 'app/components/TextTimeSchedule';
import { StyledTotal } from './styles';
import {
  selectModalIdsSelected,
  selectScheduleTutorByDateData,
  selectPriceOneOfPrice,
} from '../selectors';

export const useTables = () => {
  const scheduleData = useSelector(selectScheduleTutorByDateData);
  const idsSelected = useSelector(selectModalIdsSelected);
  const priceOfOneSession = useSelector(selectPriceOneOfPrice);

  const columns = useMemo(() => {
    return [
      {
        title: 'Time booked',
        dataIndex: 'timeBooked',
        key: 'timeBooked',
        width: '80%',
        render: time => (
          <TextTimeSchedule
            key={time.startTime}
            className="time-select"
            typeText="Purple"
            content={`${time.startTime} - ${time.endTime}`}
          />
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '20%',
      },
    ];
  }, []);

  const dataSource = useMemo(() => {
    if (scheduleData) {
      const scheduleDataDetails = scheduleData[0].scheduleDetails;
      const res = scheduleDataDetails
        .filter(item => idsSelected.includes(item.id))
        .map((value, i) => ({
          key: i,
          timeBooked: {
            startTime: value.startPeriod,
            endTime: value.endPeriod,
          },
          price: priceOfOneSession,
        }));
      return res;
    }
    return [];
  }, [idsSelected, priceOfOneSession, scheduleData]);

  const footer = () => {
    return (
      <>
        <StyledTotal>
          <div className="title">Total</div>
          <div className="price">{dataSource.length * priceOfOneSession}</div>
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
