import React from 'react';
import TransactionItem from '../TransactionItem';
import { StyledTransactionList } from './styles';

const TransactionList = ({ transactions, maxItems = 8, ...rest }) => {
  return (
    <StyledTransactionList {...rest}>
      {transactions &&
        transactions
          .slice(0, maxItems)
          .map(item => <TransactionItem key={item.id} transaction={item} />)}
    </StyledTransactionList>
  );
};

export default TransactionList;
