import React, { memo, useState } from 'react';
import { StyledModal } from './styles';
import { Collapse, Typography, Row, Col, Form, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks.js';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { LeftOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';

const { Title } = Typography;
const { Panel } = Collapse;

const ModalPayment = memo(props => {
  const [amountPaypal, setAmountPaypal] = useState(0);
  const PayPalButton = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM,
  });
  const { visible, onCancel, tutor, ...rest } = props;
  const { handlers, selectors } = useHooks();
  const { t } = useTranslation();
  const {
    listBanksVN,
    bankSelected,
    isValidMoney,
    form,
    isLoading,
    pricePerDollar,
  } = selectors;
  const {
    handleSelectBank,
    handleBackToBanks,
    handleDepositBank,
    handleChangeInputMoney,
    generateTransactionToken,
  } = handlers;

  const _createOrder = (_, actions) => {
    generateTransactionToken(amountPaypal * pricePerDollar);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amountPaypal,
          },
        },
      ],
    });
  };

  const _onApprove = async (_, actions) => {
    window.location.replace(`/verifyDeposit`);
  };

  const _onError = () => {
    window.location.replace(`/verifyDeposit?error=true`);
  };

  const renderHeader = ({ img, contentFirst, contentSecond }) => {
    return (
      <Row className="option-header align-items-center">
        <img src={img} alt="PD" className="payment-img-header" />
        <Row className="option-title flex-column">
          <p className="header-content-first">
            <span>{contentFirst}</span>
          </p>
          <p className="header-content-second">
            <span>{contentSecond}</span>
          </p>
        </Row>
      </Row>
    );
  };

  const handleChangeMoneyPaypal = values => {
    setAmountPaypal(values['money-paypal']);
  };

  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
      ]}
      {...rest}
    >
      <Title level={4} className="payment-title">
        {t('Payment.depositInApp')}
      </Title>
      <Collapse className="payment-collapse" defaultActiveKey={1} accordion>
        <Panel
          showArrow={false}
          header={renderHeader({
            img:
              'https://files.playerduo.com/production/static-files/icon/atm-card.png',
            contentFirst: 'Thanh toán trực tiếp qua Internet Banking',
            contentSecond: 'Miễn phí nạp',
          })}
          key={1}
        >
          <Row className="justify-content-center">
            <Spin spinning={isLoading} />
          </Row>
          <Row>
            {bankSelected.id && (
              <Row className="flex-column w-100">
                <Row>
                  <Row
                    className="btn-back pointer align-items-center mb-3"
                    onClick={() => handleBackToBanks()}
                  >
                    <LeftOutlined />
                    <span style={{ marginLeft: '5px' }}>
                      {t('Common.back')}
                    </span>
                  </Row>
                </Row>
                <Title level={5} className="mb-3 text-center">
                  {bankSelected.bankName}
                </Title>
                <Form
                  form={form}
                  id="form-deposit"
                  className="payment-form-recharge"
                  layout="vertical"
                  onValuesChange={handleChangeInputMoney}
                  onFinish={handleDepositBank}
                >
                  <Form.Item
                    name="money"
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (!value)
                            return Promise.reject(
                              t('Payment.minMax', {
                                min: '10.000',
                                max: '100.000.000',
                              }),
                            );
                          if (value >= 10000 && value <= 100000000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            t('Payment.minMax', {
                              min: '10.000',
                              max: '100.000.000',
                            }),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      placeholder={t('Payment.howMuchMoney', {
                        currency: 'VND',
                      })}
                    />
                  </Form.Item>

                  <Form.Item className="deposit-button">
                    <Button
                      type="accent"
                      disabled={!isValidMoney}
                      form="form-deposit"
                      htmlType="submit"
                    >
                      {t('Payment.deposit')}
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            )}
            {!bankSelected.id &&
              listBanksVN.length > 0 &&
              listBanksVN.map(bank => {
                return (
                  <Col
                    key={bank.id}
                    span={4}
                    style={{ marginBottom: '15px', cursor: 'pointer' }}
                    onClick={() => handleSelectBank(bank)}
                  >
                    <img
                      src={bank.bankLogo}
                      alt={bank.bankCode}
                      className="bank-img-thumbnail"
                    />
                  </Col>
                );
              })}
          </Row>
        </Panel>
        <Panel
          showArrow={false}
          header={renderHeader({
            img:
              'https://files.playerduo.com/production/static-files/icon/atm-card.png',
            contentFirst: 'Thanh toán trực tiếp qua Paypal',
            contentSecond: 'Phí dựa vào chính sách Paypal',
          })}
          key={2}
        >
          <Row className="justify-content-center">
            <Spin spinning={isLoading} />
          </Row>
          <Row>
            <Form
              className="payment-form-recharge-paypal"
              layout="vertical"
              onValuesChange={handleChangeMoneyPaypal}
            >
              <Form.Item
                name="money-paypal"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value)
                        return Promise.reject(
                          t('Payment.minMax', {
                            min: '5',
                            max: '100.000',
                          }),
                        );
                      if (value >= 5 && value <= 100000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        t('Payment.minMax', {
                          min: '5',
                          max: '100.000',
                        }),
                      );
                    },
                  }),
                ]}
              >
                <Input
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  placeholder={t('Payment.howMuchMoney', {
                    currency: 'USD',
                  })}
                />
              </Form.Item>
              <Form.Item className="deposit-button">
                <PayPalButton
                  createOrder={(data, actions) => _createOrder(data, actions)}
                  onApprove={(data, actions) => _onApprove(data, actions)}
                  onError={(data, actions) => _onError(data, actions)}
                  onCancel={() => _onError('Canceled')}
                />
              </Form.Item>
            </Form>
          </Row>
        </Panel>
      </Collapse>
    </StyledModal>
  );
});

export default ModalPayment;
