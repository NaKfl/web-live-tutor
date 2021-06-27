import { Form } from 'antd';
import { getListBanksVN, getPricePerDollar } from 'fetchers/paymentFetcher';
import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { selectDepositAccountStatus } from './selectors';
import { actions } from './slice';
import { actions as walletActions } from 'app/containers/Wallet/slice';
import {
  vnp_TmnCode,
  vnp_HashSecret,
  vnp_ReturnUrl,
  JWT_SECRET,
} from 'configs';
import ip from 'ip';
import moment from 'moment';
import querystring from 'query-string';
import sha256 from 'sha256';
import { sortObject, generateUUID } from 'utils/common';
import { storeTransactionToken } from 'utils/localStorageUtils';
import jwt from 'jsonwebtoken';

const useHooks = () => {
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const [listBanksVN, setListBanksVN] = useState([]);
  const [pricePerDollar, setPricePerDollar] = useState(0);
  const [bankSelected, setBankSelected] = useState({});
  const [isValidMoney, setValidMoney] = useState(true);
  const [moneyValue, setValueMoney] = useState(0);
  const depositStatus = useSelector(selectDepositAccountStatus);
  const [isLoading, setLoading] = useState(false);
  const { getHistory } = useActions(
    {
      getHistory: walletActions.getHistory,
    },
    [walletActions],
  );

  useEffect(() => {
    setLoading(true);
    getListBanksVN().then(data => {
      if (data) {
        setListBanksVN(data);
        setLoading(false);
      }
    });
    getPricePerDollar().then(data => {
      if (data?.price) {
        setPricePerDollar(data.price);
        setLoading(false);
      }
    });
  }, []);

  const handleSelectBank = useCallback(bank => {
    setBankSelected(bank);
  }, []);

  const handleBackToBanks = useCallback(() => {
    setBankSelected({});
  }, []);

  const handleChangeInputMoney = useCallback(values => {
    if (values.money >= 10000 && values.money <= 100000000) {
      setValidMoney(true);
      setValueMoney(values.money);
    } else {
      setValidMoney(false);
    }
  }, []);

  const generateTransactionToken = useCallback(price => {
    const transactionToken = jwt.sign(
      {
        id: generateUUID(),
        price,
      },
      JWT_SECRET,
    );

    storeTransactionToken(transactionToken);
  }, []);

  const handleDepositBank = useCallback(() => {
    generateTransactionToken(moneyValue);

    if (isValidMoney) {
      let vnpParams = {
        vnp_TmnCode,
        vnp_ReturnUrl,
        vnp_Version: '2',
        vnp_Command: 'pay',
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: moment().format('HHmmss'),
        vnp_OrderInfo: 'Nạp tiền vào Live Tutor',
        vnp_Amount: moneyValue * 100,
        vnp_IpAddr: ip.address(),
        vnp_CreateDate: moment().format('yyyyMMDDHHmmss'),
        vnp_BankCode: bankSelected.bankCode,
      };

      vnpParams = sortObject(vnpParams);

      const signData =
        vnp_HashSecret + querystring.stringify(vnpParams, { encode: false });

      const secureHash = sha256(signData);

      vnpParams['vnp_SecureHashType'] = 'SHA256';
      vnpParams['vnp_SecureHash'] = secureHash;

      const queryParams =
        '?' +
        querystring.stringify(vnpParams, {
          encode: true,
        });

      history.push(`/checkout-vnpay${queryParams}`);

      form.resetFields();
    }
  }, [
    bankSelected.bankCode,
    form,
    generateTransactionToken,
    history,
    isValidMoney,
    moneyValue,
  ]);

  useEffect(() => {
    const isInWallet = location.pathname === '/my-wallet';
    if (isInWallet && depositStatus === ACTION_STATUS.SUCCESS) {
      getHistory();
    }
  }, [depositStatus, getHistory, location.pathname]);

  return {
    handlers: {
      handleSelectBank,
      handleBackToBanks,
      handleDepositBank,
      handleChangeInputMoney,
      generateTransactionToken,
    },
    selectors: {
      listBanksVN,
      bankSelected,
      isValidMoney,
      form,
      isLoading,
      pricePerDollar,
    },
  };
};

export const useDepositAfterConfirm = () => {
  const depositAfterConfirmStatus = useSelector(selectDepositAccountStatus);

  const { depositToAccount } = useActions(
    {
      depositToAccount: actions.depositToAccount,
    },
    [actions],
  );

  const depositAfterConfirm = useCallback(
    token => {
      depositToAccount({
        token,
      });
    },
    [depositToAccount],
  );

  return { depositAfterConfirmStatus, depositAfterConfirm };
};

export default useHooks;
