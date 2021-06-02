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

export const Wallet = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { showPaymentModal, showTransactionModal } = useDeposit();

  const { selectors } = useHooks(props);
  const { isLoading, historyData, statisticsData } = selectors;

  return (
    <StyledWallet gutter={[30, 10]}>
      {isLoading === ACTION_STATUS.SUCCESS && (
        <>
          <StyledFullHeightCol span={16}>
            <StyledLeftPart>
              <Row>
                <WalletBalance
                  amount={statisticsData?.total}
                  income={statisticsData?.income}
                  outcome={statisticsData?.outcome}
                  showPaymentModal={showPaymentModal}
                />
              </Row>
              <Row className="row-chart">
                <ChartPanel
                  height={'100%'}
                  statistics={statisticsData.statistics}
                />
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
      {isLoading === ACTION_STATUS.PENDING && <Spin size="large" />}
    </StyledWallet>
  );
};

export default memo(Wallet);
