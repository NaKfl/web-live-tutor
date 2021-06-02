import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT, TRANSACTION_TYPES } from 'utils/constants';
import {
  StyledInfo,
  StyledLeftPart,
  StyledPrice,
  StyledTransactionItem,
  StyledUpDownIcon,
} from './styles';

const TransactionItem = ({ transaction, ...rest }) => {
  const { t } = useTranslation();
  const tutorInfo = transaction?.bookingInfo?.scheduleDetailInfo?.tutorInfo;
  const studentInfo = transaction?.bookingInfo?.userInfo;
  const { price, createdAt, type } = transaction;

  return (
    <StyledTransactionItem {...rest}>
      <StyledLeftPart>
        {(price > 0 && (
          <StyledUpDownIcon isUp>
            <ArrowUpOutlined />
          </StyledUpDownIcon>
        )) || (
          <StyledUpDownIcon isUp={false}>
            <ArrowDownOutlined />
          </StyledUpDownIcon>
        )}
        <StyledInfo>
          <h3>
            {type === TRANSACTION_TYPES.DEPOSIT && `${t('Wallet.deposit')}`}
            {type === TRANSACTION_TYPES.BUY &&
              `${t('Wallet.book')} ${tutorInfo.name}`}
            {type === TRANSACTION_TYPES.SELL &&
              `${t('Wallet.bookBy', {
                name: studentInfo.name || 'Anonymous',
              })}`}
            {type === TRANSACTION_TYPES.CANCEL &&
              `${t('Wallet.cancelBook', {
                name: tutorInfo.name || 'Anonymous',
              })}`}
            {type === TRANSACTION_TYPES.RETURN &&
              `${t('Wallet.returnBook', {
                name: studentInfo.name || 'Anonymous',
              })}`}
          </h3>
          <span>{moment(createdAt).format(DATE_FORMAT)}</span>
        </StyledInfo>
      </StyledLeftPart>
      <StyledPrice isUp={price > 0}>
        {`${price > 0 ? '+' : ''}${new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(price)}`}
      </StyledPrice>
    </StyledTransactionItem>
  );
};

export default TransactionItem;
