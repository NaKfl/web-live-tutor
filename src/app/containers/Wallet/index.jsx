import { Col, Row, Spin } from 'antd';
import WalletBalance from 'app/components/WalletBalance';
import React, { memo } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import ChartPanel from './ChartPanel';
import useHooks from './hooks';
import { useShowModal } from 'app/containers/AppLayout/hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledFullHeightCol, StyledWallet, StyledLeftPart } from './styles';
import TransactionPanel from './TransactionPanel';
import querystring from 'querystring';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useWindowDimensions from 'hooks/useWindowDimensions';

export const Wallet = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });

  const { t } = useTranslation();
  const history = useHistory();

  const { showPaymentModal, showTransactionModal } = useShowModal();

  const { selectors } = useHooks(props);
  const { isLoading, historyData, statisticsData } = selectors;

  const query = querystring.parse(props?.location?.search);

  const { width } = useWindowDimensions();

  if (width <= 1300)
    return (
      <StyledWallet gutter={[30, 30]}>
        {isLoading === ACTION_STATUS.SUCCESS && (
          <>
            {query['?analytic-full-view'] ? (
              <>
                <StyledFullHeightCol span={24}>
                  <StyledLeftPart>
                    <Row className="row-chart">
                      <ChartPanel
                        height={'100%'}
                        statistics={statisticsData.statistics}
                        actionHandler={
                          query['?analytic-full-view']
                            ? () => history.push('/my-wallet')
                            : () =>
                                history.push(
                                  '/my-wallet?analytic-full-view=true',
                                )
                        }
                        actionName={
                          query['?analytic-full-view']
                            ? t('Wallet.close')
                            : t('Wallet.actionName')
                        }
                      />
                    </Row>
                  </StyledLeftPart>
                </StyledFullHeightCol>
              </>
            ) : (
              <>
                <Col span={24}>
                  <Row>
                    <WalletBalance
                      amount={statisticsData?.total}
                      income={statisticsData?.income}
                      outcome={statisticsData?.outcome}
                      showPaymentModal={showPaymentModal}
                      isColumn
                    />
                  </Row>
                </Col>
                <StyledFullHeightCol span={24}>
                  <TransactionPanel
                    height={'100%'}
                    transactions={historyData.rows}
                    actionHandler={() => showTransactionModal(historyData.rows)}
                  />
                </StyledFullHeightCol>
              </>
            )}
          </>
        )}
        {isLoading === ACTION_STATUS.PENDING && <Spin size="large" />}
      </StyledWallet>
    );
  return (
    <StyledWallet gutter={[30, 10]}>
      {isLoading === ACTION_STATUS.SUCCESS && (
        <>
          {query['?analytic-full-view'] ? (
            <>
              <StyledFullHeightCol span={24}>
                <StyledLeftPart>
                  <Row className="row-chart">
                    <ChartPanel
                      height={'100%'}
                      statistics={statisticsData.statistics}
                      actionHandler={
                        query['?analytic-full-view']
                          ? () => history.push('/my-wallet')
                          : () =>
                              history.push('/my-wallet?analytic-full-view=true')
                      }
                      actionName={
                        query['?analytic-full-view']
                          ? t('Wallet.close')
                          : t('Wallet.actionName')
                      }
                    />
                  </Row>
                </StyledLeftPart>
              </StyledFullHeightCol>
            </>
          ) : (
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
                      actionHandler={
                        query['?analytic-full-view']
                          ? () => history.push('/my-wallet')
                          : () =>
                              history.push('/my-wallet?analytic-full-view=true')
                      }
                      actionName={
                        query['?analytic-full-view']
                          ? t('Wallet.close')
                          : t('Wallet.actionName')
                      }
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
        </>
      )}
      {isLoading === ACTION_STATUS.PENDING && <Spin size="large" />}
    </StyledWallet>
  );
};

export default memo(Wallet);
