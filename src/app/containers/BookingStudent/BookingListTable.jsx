import { memo } from 'react';
import { Table } from 'antd';
import { useForm } from './hooks';
import { StyledTable, StyledHeaderTable } from './styles';
import Pagination from 'app/components/Pagination';
import { useTranslation } from 'react-i18next';
import greenCal from 'assets/svg/greenCal.svg';

export const BookingListTable = memo(
  ({ totalCount, onChangePage, handleCancelBooking, dataSource }) => {
    const { t } = useTranslation();
    const form = useForm(dataSource, handleCancelBooking);

    return (
      <StyledTable>
        <StyledHeaderTable>
          <img className="image" src={greenCal} alt="calendar" />
          <div className="content">
            <h2>{t('BookingList.bookingForStudentTitle')}</h2>
            <p>{t('BookingList.guideForStudent')}</p>
            <p>{t('BookingList.subGuideForStudent')}</p>
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
