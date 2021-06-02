import React, { memo } from 'react';
import { StyledModal } from './styles';
import { Collapse, Typography, Row, Col, Form, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import useHooks from './hooks.js';
import Button from 'app/components/Button';
import Input from 'app/components/Input';
import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

const ModalPayment = memo(props => {
  const { visible, onCancel, tutor, ...rest } = props;
  const { handlers, selectors } = useHooks();
  const { t } = useTranslation();
  const {
    listBanksVN,
    bankSelected,
    isValidMoney,
    form,
    isLoading,
  } = selectors;
  const {
    handleSelectBank,
    handleBackToBanks,
    handleDepositBank,
    handleChangeInputMoney,
  } = handlers;
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
      <Collapse className="payment-collapse" defaultActiveKey={1}>
        <Panel
          showArrow={false}
          header={renderHeader({
            img:
              'https://files.playerduo.com/production/static-files/icon/atm-card.png',
            contentFirst: 'Thanh toán trực tiếp qua Internet Banking',
            contentSecond: 'Phí 1.760đ + 3% giá trị nạp',
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
                            return Promise.reject(t('Payment.minMax'));
                          if (value >= 10000 && value <= 100000000) {
                            return Promise.resolve();
                          }
                          return Promise.reject(t('Payment.minMax'));
                        },
                      }),
                    ]}
                  >
                    <Input
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      placeholder={t('Payment.howMuchMoney')}
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
      </Collapse>
    </StyledModal>
  );
});

export default ModalPayment;
