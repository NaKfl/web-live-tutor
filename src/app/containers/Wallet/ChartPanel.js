import WalletPanel from 'app/components/WalletPanel';
import { useTranslation } from 'react-i18next';
import WalletChart from 'app/components/WalletChart';

const ChartPanel = ({
  statistics,
  height,
  width,
  actionName,
  actionHandler,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <WalletPanel
      height={height}
      width={width}
      name={t('Wallet.chartTitle')}
      actionName={actionName || t('Wallet.actionName')}
      content={<WalletChart statistics={statistics} />}
      actionHandler={actionHandler}
      {...rest}
    />
  );
};

export default ChartPanel;
