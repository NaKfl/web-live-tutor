import { Typography } from 'antd';
import Button from 'app/components/Button';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledModal } from './styles';
import TransactionListTable from './TransactionListTable';

const { Title } = Typography;

const ModalTransaction = memo(props => {
  const { visible, onCancel, transactions, ...rest } = props;
  const { t } = useTranslation();
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
        {t('Payment.transactionsList')}
      </Title>
      <TransactionListTable
        totalCount={transactions.length}
        dataSource={transactions}
      ></TransactionListTable>
    </StyledModal>
  );
});

export default ModalTransaction;
