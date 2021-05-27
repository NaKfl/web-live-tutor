import { Form } from 'antd';
import { getListBanksVN } from 'fetchers/authFetcher';
import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import { selectDepositAccountStatus } from './selectors';
import { actions } from './slice';
import { actions as walletActions } from 'app/containers/Wallet/slice';

const useHooks = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [listBanksVN, setListBanksVN] = useState([]);
  const [bankSelected, setBankSelected] = useState({});
  const [isValidMoney, setValidMoney] = useState(true);
  const [moneyValue, setValueMoney] = useState(0);
  const depositStatus = useSelector(selectDepositAccountStatus);
  const [isLoading, setLoading] = useState(false);
  const { depositToAccount, getHistory } = useActions(
    {
      depositToAccount: actions.depositToAccount,
      getHistory: walletActions.getHistory,
    },
    [actions, walletActions],
  );

  useEffect(() => {
    setLoading(true);
    getListBanksVN().then(data => {
      const removes = [0, 295, 296];
      const listBanks = data.filter(bank => !removes.includes(bank.id));
      setListBanksVN(listBanks);
      setLoading(false);
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

  const handleDepositBank = useCallback(() => {
    if (isValidMoney) {
      depositToAccount({
        price: moneyValue,
      });
      form.resetFields();
    }
  }, [depositToAccount, form, isValidMoney, moneyValue]);

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
    },
    selectors: {
      listBanksVN,
      bankSelected,
      isValidMoney,
      form,
      isLoading,
    },
  };
};

export default useHooks;
