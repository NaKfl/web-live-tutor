import TransactionList from 'app/components/TransactionList';
import WalletPanel from 'app/components/WalletPanel';
import { useTranslation } from 'react-i18next';

const TransactionPanel = ({
  transactions,
  actionHandler,
  height,
  width,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <WalletPanel
      height={height}
      width={width}
      name={t('Wallet.transactionTitle')}
      actionName={t('Wallet.actionName')}
      actionHandler={actionHandler}
      content={<TransactionList transactions={transactions} />}
      {...rest}
    />
  );
};

export default TransactionPanel;
