import React from 'react';
import {
  StyledTransactionItem,
  StyledUpDownIcon,
  StyledInfo,
  StyledLeftPart,
  StyledPrice,
} from './styles';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const TransactionItem = ({ transaction, ...rest }) => {
  const { t } = useTranslation();
  const tutorInfo = transaction?.bookingInfo?.scheduleDetailInfo?.tutorInfo;
  const { price, createdAt } = transaction;

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
            {tutorInfo ? `${t('Wallet.book')} ${tutorInfo.name}` : 'Deposit'}
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
