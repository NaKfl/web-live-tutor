import React from 'react';
import {
  StyledWalletBalance,
  StyledLeftPart,
  StyledRightPart,
  StyledInOutCome,
} from './styles';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { DATE_TIME_FORMAT } from 'utils/constants';
import Button from '../Button';

const WalletBalance = ({
  amount = 0,
  income = 0,
  outcome = 0,
  showPaymentModal,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <StyledWalletBalance {...rest}>
      <StyledLeftPart>
        <h3>{t('Wallet.balance')}</h3>
        <h1>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(amount)}
        </h1>
        <p>{moment().format(DATE_TIME_FORMAT)}</p>
        <Button type="accent" onClick={() => showPaymentModal()}>
          {t('Wallet.depositNow')}
        </Button>
      </StyledLeftPart>
      <StyledRightPart>
        <StyledInOutCome className="mb-4">
          <div className="wrapper">
            <UpCircleOutlined className="icon income-icon" />
            <div className="amount">
              <p>{t('Wallet.income')}</p>
              <h3 className="income">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(income)}
              </h3>
            </div>
          </div>
        </StyledInOutCome>
        <StyledInOutCome>
          <div className="wrapper">
            <DownCircleOutlined className="icon outcome-icon" />
            <div className="amount">
              <p>{t('Wallet.outcome')}</p>
              <h3 className="outcome">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(outcome)}
              </h3>
            </div>
          </div>
        </StyledInOutCome>
      </StyledRightPart>
    </StyledWalletBalance>
  );
};

export default WalletBalance;
