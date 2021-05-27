import { TRANSACTION_TYPES } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const useHooks = () => {
  return {
    handlers: {},
    selectors: {},
  };
};

export const useForm = data => {
  const { t } = useTranslation();
  const columnsForTransaction = [
    {
      key: 'STT',
      dataIndex: 'id',
      title: 'STT',
      width: '10%',
      render: (_, __, index) => {
        return <h4>{index}</h4>;
      },
    },
    {
      key: 'Type',
      dataIndex: 'Type',
      title: 'Type',
      width: '10%',
      render: (_, record, __) => {
        return (
          <h4>
            {record.type === TRANSACTION_TYPES.DEPOSIT &&
              `${t('Wallet.deposit')}`}
            {record.type === TRANSACTION_TYPES.BUY && `${t('Wallet.book')} `}
            {record.type === TRANSACTION_TYPES.SELL && `${t('Wallet.bookBy')}`}
            {record.type === TRANSACTION_TYPES.CANCEL &&
              `${t('Wallet.cancelBook')}`}
            {record.type === TRANSACTION_TYPES.RETURN &&
              `${t('Wallet.returnBook')}`}
          </h4>
        );
      },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Price',
      render: (_, record, __) => {
        const price = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(record.price);
        console.log({ price });
        return <h4>{price}</h4>;
      },
    },
    {
      key: 'tutor',
      dataIndex: 'createdAt',
      title: 'Tutor',
      render: (_, record, __) => {
        const tutorInfo = record?.bookingInfo?.scheduleDetailInfo?.tutorInfo;
        return <h4>{tutorInfo?.name ?? '-----'}</h4>;
      },
    },
    {
      key: 'student',
      dataIndex: 'createdAt',
      title: 'Student',
      render: (_, record, __) => {
        const studentInfo = record?.bookingInfo?.userInfo;
        return <h4>{studentInfo?.name ?? '-----'}</h4>;
      },
    },
    {
      key: 'Transaction Time',
      dataIndex: 'createdAt',
      title: 'Transaction Time',
      render: (_, record, __) => {
        const time = moment(record.createdAt).format('YYYY/MM/DD HH:MM');
        return <h4>{time}</h4>;
      },
    },
  ];

  return {
    dataSource: data,
    columns: columnsForTransaction,
    bordered: true,
    pagination: { pageSize: 5 },
  };
};
