import { Empty } from 'antd';
import React from 'react';
import TransactionItem from '../TransactionItem';
import { StyledTransactionList } from './styles';
import { useTranslation } from 'react-i18next';

const TransactionList = ({ transactions, maxItems = 10, ...rest }) => {
  const { t } = useTranslation();
  return (
    <StyledTransactionList {...rest}>
      {(transactions?.length &&
        transactions
          .slice(0, maxItems)
          .map(item => (
            <TransactionItem key={item.id} transaction={item} />
          ))) || (
        <Empty
          style={{ marginTop: 30 }}
          description={<span>{t('Common.empty')}</span>}
        />
      )}
    </StyledTransactionList>
  );
};

export default TransactionList;
