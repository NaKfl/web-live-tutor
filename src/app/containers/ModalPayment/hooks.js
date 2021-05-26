import { useCallback, useEffect, useState } from 'react';
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { selectDepositAccount } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { actions } from './slice';
import { getListBanksVN } from 'fetchers/authFetcher';
import { notifySuccess } from 'utils/notify';
import { Form } from 'antd';

const useHooks = () => {
  const [form] = Form.useForm();
  const [listBanksVN, setListBanksVN] = useState([]);
  const [bankSelected, setBankSelected] = useState({});
  const [isValidMoney, setValidMoney] = useState(true);
  const [moneyValue, setValueMoney] = useState(0);
  const { depositToAccount } = useActions(
    {
      depositToAccount: actions.depositToAccount,
    },
    [actions],
  );

  useEffect(() => {
    getListBanksVN().then(data => {
      const removes = [0, 295, 296];
      const listBanks = data.filter(bank => !removes.includes(bank.id));
      setListBanksVN(listBanks);
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
    },
  };
};

export default useHooks;
