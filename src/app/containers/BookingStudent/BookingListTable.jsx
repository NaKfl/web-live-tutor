import { memo } from 'react';
import { Table } from 'antd';
import { useForm } from './hooks';
import { StyledTable, StyledHeaderTable } from './styles';
import Typography from 'app/components/Typography';
import Pagination from 'app/components/Pagination';

const { Title } = Typography;

export const BookingListTable = memo(
  ({ totalCount, onChangePage, handleCancelBooking, dataSource }) => {
    const form = useForm(dataSource, handleCancelBooking);
    return (
      <StyledTable>
        <StyledHeaderTable>
          <Title level={2}>Booking List</Title>
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
