import Button from 'app/components/Button';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledModal } from './styles';
import TransactionListTable from './TransactionListTable';

const ModalTransaction = memo(props => {
  const { visible, onCancel, transactions, ...rest } = props;
  const { t } = useTranslation();
  return (
    <StyledModal
      centered
      title={<h3 className="payment-title">{t('Wallet.title')}</h3>}
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
          {t('Common.cancel')}
        </Button>,
      ]}
      {...rest}
    >
      <TransactionListTable
        totalCount={transactions.length}
        dataSource={transactions}
      ></TransactionListTable>
    </StyledModal>
  );
});

export default ModalTransaction;
