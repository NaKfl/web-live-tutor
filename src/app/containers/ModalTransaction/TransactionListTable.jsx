import { memo } from 'react';
import { Table } from 'antd';
import { useForm } from './hooks';
import { StyledTable } from './styles';
import Pagination from 'app/components/Pagination';

export const TransactionListTable = memo(
  ({ totalCount, onChangePage, dataSource }) => {
    const form = useForm(dataSource);
    return (
      <StyledTable>
        <Table {...form}></Table>
        {/* {!!totalCount && (
          <Pagination total={totalCount} onChange={onChangePage}></Pagination>
        )} */}
      </StyledTable>
    );
  },
);

export default TransactionListTable;
