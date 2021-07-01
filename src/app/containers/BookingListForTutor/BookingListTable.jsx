import { memo } from 'react';
import { Table } from 'antd';
import { useForm } from './hooks';
import { StyledTable, StyledHeaderTable } from './styles';
import Pagination from 'app/components/Pagination';
import { useTranslation } from 'react-i18next';
import calendarCheck from 'assets/svg/calendar-check.svg';

export const BookingListTable = memo(
  ({ totalCount, onChangePage, dataSource }) => {
    console.log(totalCount);
    const { t } = useTranslation();
    const form = useForm(dataSource);

    return (
      <StyledTable>
        <StyledHeaderTable>
          <img className="image" src={calendarCheck} alt="calendar" />
          <div className="content">
            <h2>{t('BookingList.bookingForTutorTitle')}</h2>
            <p>{t('BookingList.guideForTutor')}</p>
            <p>{t('BookingList.subGuideForTutor')}</p>
          </div>
        </StyledHeaderTable>
        <Table {...form}></Table>
        {!!totalCount && (
          <Pagination total={totalCount} onChange={onChangePage}></Pagination>
        )}
      </StyledTable>
    );
  },
);

export default BookingListTable;
