import { Table } from 'antd';
import Pagination from 'app/components/Pagination';
import Typography from 'app/components/Typography';
import { memo } from 'react';
import { useForm } from './hook';
import { StyledHeaderTable, StyledTable } from './style';

const { Title } = Typography;

export const CallSessionTable = memo(
  ({ changeCategory, totalCount, onChangePage }) => {
    const form = useForm();
    return (
      <StyledTable>
        <StyledHeaderTable>
          <Title level={2}>Call session history</Title>
          {/* <Select
            defaultValue="Student Role"
            size="small"
            style={{ width: 120 }}
            onChange={changeCategory}
          >
            <Select.Option value="student">Student Role</Select.Option>
            <Select.Option value="tutor">Tutor Role</Select.Option>
          </Select> */}
        </StyledHeaderTable>
        <Table {...form}></Table>
        {!!totalCount && (
          <Pagination total={totalCount} onChange={onChangePage}></Pagination>
        )}
      </StyledTable>
    );
  },
);

export default CallSessionTable;
