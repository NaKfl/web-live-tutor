import { Spin } from 'antd';
import WalletBalance from 'app/components/WalletBalance';
import React, { memo } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledFullHeightCol, StyledWallet } from './styles';
import TransactionPanel from './TransactionPanel';

export const Wallet = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { selectors } = useHooks();
  const { historyStatus, historyData, total, income, outcome } = selectors;

  return (
    <StyledWallet gutter={[30, 0]}>
      {historyStatus === ACTION_STATUS.SUCCESS && (
        <>
          <StyledFullHeightCol span={2}></StyledFullHeightCol>
          <StyledFullHeightCol span={15}>
            <WalletBalance amount={total} income={income} outcome={outcome} />
          </StyledFullHeightCol>
          <StyledFullHeightCol span={7}>
            <TransactionPanel height={'100%'} transactions={historyData.rows} />
          </StyledFullHeightCol>
        </>
      )}
      {historyStatus === ACTION_STATUS.PENDING && <Spin size="large" />}
    </StyledWallet>
  );
};

export default memo(Wallet);
