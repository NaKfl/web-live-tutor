import { Row, Spin } from 'antd';
import WalletBalance from 'app/components/WalletBalance';
import React, { memo } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import ChartPanel from './ChartPanel';
import useHooks, { useDeposit } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledFullHeightCol, StyledWallet, StyledLeftPart } from './styles';
import TransactionPanel from './TransactionPanel';

export const Wallet = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { showPaymentModal, showTransactionModal } = useDeposit();

  const { selectors } = useHooks();
  const {
    historyStatus,
    historyData,
    total,
    income,
    outcome,
    statistics,
  } = selectors;

  return (
    <StyledWallet gutter={[30, 5]}>
      {historyStatus === ACTION_STATUS.SUCCESS && (
        <>
          <StyledFullHeightCol span={16}>
            <StyledLeftPart>
              <Row>
                <WalletBalance
                  amount={total}
                  income={income}
                  outcome={outcome}
                  showPaymentModal={showPaymentModal}
                />
              </Row>
              <Row className="row-chart">
                <ChartPanel height={'100%'} statistics={statistics} />
              </Row>
            </StyledLeftPart>
          </StyledFullHeightCol>
          <StyledFullHeightCol span={8}>
            <TransactionPanel
              height={'100%'}
              transactions={historyData.rows}
              actionHandler={() => showTransactionModal(historyData.rows)}
            />
          </StyledFullHeightCol>
        </>
      )}
      {historyStatus === ACTION_STATUS.PENDING && <Spin size="large" />}
    </StyledWallet>
  );
};

export default memo(Wallet);
