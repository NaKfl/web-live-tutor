import { DATE_TIME_FORMAT, TRANSACTION_TYPES } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Tag } from 'antd';

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
      title: <p className="title">{t('Wallet.orderNumber')}</p>,
      key: 'no',
      width: '55px',
      fixed: 'left',
      align: 'center',
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: <p className="title">{t('Wallet.time')}</p>,
      key: 'time',
      dataIndex: 'createdAt',
      render: (_, record) => {
        const time = moment(record.createdAt).format(DATE_TIME_FORMAT);
        return <Tag color="blue">{time}</Tag>;
      },
    },
    {
      title: <p className="title">{t('Wallet.type')}</p>,
      key: 'type',
      width: '150px',
      render: (_, record) => {
        return (
          <span>
            {record.type === TRANSACTION_TYPES.DEPOSIT && (
              <Tag color="geekblue">{`${t('Wallet.deposit')}`}</Tag>
            )}
            {record.type === TRANSACTION_TYPES.BUY && (
              <Tag color="green">{`${t('Wallet.book')} `}</Tag>
            )}
            {record.type === TRANSACTION_TYPES.SELL && (
              <Tag color="gold">{`${t('Wallet.bookBy')}`}</Tag>
            )}
            {record.type === TRANSACTION_TYPES.CANCEL && (
              <Tag color="red">{`${t('Wallet.cancelBook')}`}</Tag>
            )}
            {record.type === TRANSACTION_TYPES.RETURN && (
              <Tag color="cyan">{`${t('Wallet.returnBook')}`}</Tag>
            )}
          </span>
        );
      },
    },
    {
      title: <p className="title">{t('Wallet.price')}</p>,
      key: 'price',
      dataIndex: 'price',
      render: (_, record) => {
        const price = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(record.price);
        return <span>{price}</span>;
      },
    },
    {
      key: 'tutor',
      title: <p className="title">{t('Wallet.tutor')}</p>,
      render: (_, record) => {
        const tutorInfo = record?.bookingInfo?.scheduleDetailInfo?.tutorInfo;
        return <span>{tutorInfo?.name ?? '-'}</span>;
      },
    },
    {
      title: <p className="title">{t('Wallet.student')}</p>,
      key: 'student',
      render: (_, record, __) => {
        const studentInfo = record?.bookingInfo?.userInfo;
        return <span>{studentInfo?.name ?? '-'}</span>;
      },
    },
  ];

  return {
    dataSource: data,
    columns: columnsForTransaction,
    pagination: { pageSize: 5 },
    size: 'small',
    scroll: { x: 850 },
    bordered: false,
    locale: {
      emptyText: t('Common.empty'),
    },
  };
};
