import { Table } from 'antd';
import Pagination from 'app/components/Pagination';
import { memo } from 'react';
import { useForm } from './hook';
import historyIcon from 'assets/svg/history.svg';
import { StyledHeaderTable, StyledTable } from './style';
import { useTranslation } from 'react-i18next';

export const CallSessionTable = memo(({ totalCount, onChangePage }) => {
  const { t } = useTranslation();
  const form = useForm();

  return (
    <StyledTable>
      <StyledHeaderTable>
        <img className="image" src={historyIcon} alt="calendar" />
        <div className="content">
          <h2>{t('History.title')}</h2>
          <p>{t('History.guide')}</p>
          <p>{t('History.subGuide')}</p>
        </div>
      </StyledHeaderTable>
      <Table {...form}></Table>
      {!!totalCount && (
        <Pagination total={totalCount} onChange={onChangePage}></Pagination>
      )}
    </StyledTable>
  );
});

export default CallSessionTable;
