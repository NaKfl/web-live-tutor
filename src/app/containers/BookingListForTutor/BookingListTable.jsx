import { memo } from 'react';
import { Table } from 'antd';
import { useForm } from './hooks';
import { StyledTable, StyledHeaderTable } from './styles';
import Typography from 'app/components/Typography';
import Pagination from 'app/components/Pagination';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

export const BookingListTable = memo(
  ({ totalCount, onChangePage, handleCancelBooking, dataSource }) => {
    const { t } = useTranslation();
    const form = useForm(dataSource, handleCancelBooking);
    return (
      <StyledTable>
        <StyledHeaderTable>
          <Title level={2}>{t('BookingList.bookingForTutorTitle')}</Title>
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
