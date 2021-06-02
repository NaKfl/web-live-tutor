import { Table } from 'antd';
import { memo } from 'react';
import { useForm } from './hooks';
import { StyledTable } from './styles';

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
